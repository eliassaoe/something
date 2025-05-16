const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { Translate } = require('@google-cloud/translate').v2;
const cheerio = require('cheerio');

// Installez le package slugify si vous ne l'avez pas déjà
let slugify;
try {
  slugify = require('slugify');
} catch (e) {
  // Fonction simple de slugify si le package n'est pas disponible
  slugify = (str) => {
    return str
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  };
}

// Configuration de l'API Google Translate avec votre clé
const translate = new Translate({
  key: 'AIzaSyC3m8ihaQF54PqboogrbwTjAxgtBtaNbQI'
});

// Langues cibles (codes ISO)
const targetLanguages = [
  { code: 'ar', name: 'arabe' },
  { code: 'pt', name: 'portugais' },
  { code: 'es', name: 'espagnol' },
  { code: 'fr', name: 'français' },
  { code: 'nl', name: 'néerlandais' }
];

// Répertoire contenant vos fichiers HTML
const sourceDir = './';

// Langue d'origine de votre site
const sourceLanguage = 'en';  // Changez selon votre langue d'origine

// Domaine de votre site
const domain = 'https://unlimited-leads.online';

// Fichier de suivi pour les traductions déjà effectuées
const translationLogFile = '.translation-log.json';

// Cache pour stocker les traductions de noms de fichiers
const slugTranslations = {};

// Fonction pour créer un dossier s'il n'existe pas
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Dossier créé: ${dirPath}`);
  }
}

// Fonction pour obtenir la liste des fichiers HTML modifiés depuis le dernier commit
function getModifiedFiles() {
  try {
    // Fichiers ajoutés ou modifiés dans le dernier commit
    const lastCommitFiles = execSync('git diff-tree --no-commit-id --name-only -r HEAD').toString().trim().split('\n');
    
    // Fichier de suivi pour les traductions déjà effectuées
    let translationLog = {};
    if (fs.existsSync(translationLogFile)) {
      try {
        translationLog = JSON.parse(fs.readFileSync(translationLogFile, 'utf8'));
      } catch (e) {
        console.error('Erreur lors de la lecture du fichier de suivi:', e);
      }
    }
    
    // Filtre pour ne garder que les fichiers HTML qui ont été modifiés ou qui n'ont jamais été traduits
    return lastCommitFiles
      .filter(file => 
        file.endsWith('.html') && 
        fs.existsSync(file) && 
        fs.statSync(file).isFile() &&
        (!translationLog[file] || 
         translationLog[file].lastModified < fs.statSync(file).mtimeMs)
      );
  } catch (error) {
    console.error('Erreur lors de la récupération des fichiers modifiés:', error);
    
    // En cas d'erreur, renvoyer tous les fichiers HTML à la racine
    return fs.readdirSync(sourceDir)
      .filter(file => 
        file.endsWith('.html') && 
        fs.statSync(path.join(sourceDir, file)).isFile()
      );
  }
}

// Fonction pour traduire et convertir en slug un nom de fichier
async function translateAndSlugifyFilename(filename, targetLanguage) {
  // Si c'est index.html, on le garde tel quel
  if (filename === 'index.html') {
    return 'index.html';
  }
  
  // Extraire le nom sans extension
  const extension = path.extname(filename);
  const nameWithoutExt = path.basename(filename, extension);
  
  // Vérifier si nous avons déjà traduit ce nom dans cette langue
  const cacheKey = `${nameWithoutExt}_${targetLanguage}`;
  if (slugTranslations[cacheKey]) {
    return slugTranslations[cacheKey] + extension;
  }
  
  try {
    // Traduire le nom de fichier
    const [translatedName] = await translate.translate(nameWithoutExt.replace(/-/g, ' '), targetLanguage);
    
    // Slugifier le nom traduit
    const sluggedName = slugify(translatedName, { lower: true });
    
    // Stocker dans le cache
    slugTranslations[cacheKey] = sluggedName;
    
    // Retourner le nom complet avec extension
    return sluggedName + extension;
  } catch (error) {
    console.error(`Erreur lors de la traduction du nom de fichier: ${error}`);
    return filename; // En cas d'erreur, renvoyer le nom original
  }
}

// Fonction pour traduire le contenu HTML
async function translateHtml(htmlContent, targetLanguage, file, translatedFilename) {
  const $ = cheerio.load(htmlContent, { decodeEntities: false });
  
  // Définir l'attribut lang sur la balise html pour le SEO
  $('html').attr('lang', targetLanguage);
  
  // Traduire le titre de la page (balise <title>)
  const pageTitle = $('title').text().trim();
  if (pageTitle) {
    try {
      const [translatedTitle] = await translate.translate(pageTitle, targetLanguage);
      $('title').text(translatedTitle);
    } catch (error) {
      console.error(`Erreur lors de la traduction du titre: ${error}`);
    }
  }
  
  // Traduire les meta tags (description, keywords, etc.)
  $('meta[name="description"], meta[name="keywords"], meta[property="og:title"], meta[property="og:description"]').each(async (i, elem) => {
    const content = $(elem).attr('content');
    if (content) {
      try {
        const [translatedContent] = await translate.translate(content, targetLanguage);
        $(elem).attr('content', translatedContent);
      } catch (error) {
        console.error(`Erreur lors de la traduction d'une balise meta: ${error}`);
      }
    }
  });
  
  // Ajouter les balises hreflang pour le SEO
  $('head link[rel="alternate"][hreflang]').remove(); // Supprimer les balises existantes
  
  // Chemin relatif pour cette page
  const originalFilename = path.basename(file);
  let originalRelPath = originalFilename === 'index.html' ? '/' : `/${originalFilename}`;
  let translatedRelPath = translatedFilename === 'index.html' ? '/' : `/${translatedFilename}`;
  
  // Ajouter une balise hreflang pour la langue par défaut (x-default)
  $('head').append(`<link rel="alternate" hreflang="x-default" href="${domain}${originalRelPath}" />`);
  
  // Ajouter hreflang pour la langue d'origine
  $('head').append(`<link rel="alternate" hreflang="${sourceLanguage}" href="${domain}${originalRelPath}" />`);
  
  // Ajouter hreflang pour chaque langue cible
  for (const lang of targetLanguages) {
    // Si c'est la langue courante, utiliser le chemin traduit actuel
    if (lang.code === targetLanguage) {
      $('head').append(`<link rel="alternate" hreflang="${lang.code}" href="${domain}/${lang.code}${translatedRelPath}" />`);
      continue;
    }
    
    // Pour les autres langues, traduire le nom de fichier et créer le chemin
    let otherLangFilename = await translateAndSlugifyFilename(originalFilename, lang.code);
    let otherLangRelPath = otherLangFilename === 'index.html' ? '/' : `/${otherLangFilename}`;
    
    $('head').append(`<link rel="alternate" hreflang="${lang.code}" href="${domain}/${lang.code}${otherLangRelPath}" />`);
  }
  
  // Adapter les liens internes pour qu'ils pointent vers les versions traduites
  $('a').each(async (i, elem) => {
    const href = $(elem).attr('href');
    if (href && href.endsWith('.html') && !href.startsWith('http') && !href.startsWith('#')) {
      const linkFilename = path.basename(href);
      const translatedLinkFilename = await translateAndSlugifyFilename(linkFilename, targetLanguage);
      
      // Remplacer le nom de fichier dans le lien
      const newHref = href.replace(linkFilename, translatedLinkFilename);
      $(elem).attr('href', `/${targetLanguage}/${newHref}`);
    }
  });
  
  // Liste des sélecteurs pour le texte visible à traduire
  const visibleTextSelectors = 'p, h1, h2, h3, h4, h5, h6, span, div, a, li, td, th, button, label';
  
  // Fonction pour traiter un élément et ses enfants
  async function processElement(element) {
    const $element = $(element);
    
    // Si l'élément a des enfants (autre que du texte), on traite chaque enfant séparément
    if ($element.children().length > 0) {
      // Parcourir les nœuds enfants
      for (let i = 0; i < element.childNodes.length; i++) {
        const child = element.childNodes[i];
        
        // Si c'est un nœud texte directement sous cet élément
        if (child.type === 'text') {
          const text = child.data.trim();
          if (text) {
            try {
              const [translation] = await translate.translate(text, targetLanguage);
              child.data = child.data.replace(text, translation);
            } catch (error) {
              console.error(`Erreur de traduction: ${error}`);
            }
          }
        } 
        // Sinon si c'est un élément HTML, on le traite récursivement
        else if (child.type === 'tag') {
          // On ne traite pas les scripts, styles et autres éléments à préserver
          const tagName = child.name.toLowerCase();
          if (tagName !== 'script' && tagName !== 'style' && !$(child).is('[translate="no"]')) {
            await processElement(child);
          }
        }
      }
    } 
    // Si l'élément n'a pas d'enfants HTML (seulement du texte)
    else {
      const text = $element.text().trim();
      if (text) {
        try {
          const [translation] = await translate.translate(text, targetLanguage);
          $element.text(translation);
        } catch (error) {
          console.error(`Erreur de traduction: ${error}`);
        }
      }
    }
  }
  
  // Traiter le body pour tout le texte visible
  const visibleElements = $(visibleTextSelectors);
  
  // Compteur pour suivre la progression
  let processedElements = 0;
  const totalElements = visibleElements.length;
  
  for (let i = 0; i < visibleElements.length; i++) {
    // On ne traite pas les éléments qui sont dans un script ou style
    if (!$(visibleElements[i]).parents('script, style').length && 
        !$(visibleElements[i]).is('script, style') && 
        !$(visibleElements[i]).is('[translate="no"]')) {
      await processElement(visibleElements[i]);
      
      // Mise à jour de la progression
      processedElements++;
      if (processedElements % 10 === 0 || processedElements === totalElements) {
        console.log(`  Progression: ${processedElements}/${totalElements} éléments traités (${Math.round(processedElements/totalElements*100)}%)`);
      }
    }
  }
  
  return $.html();
}

// Fonction pour mettre à jour le journal des traductions
function updateTranslationLog(files) {
  let translationLog = {};
  
  // Charger le journal existant s'il existe
  if (fs.existsSync(translationLogFile)) {
    try {
      translationLog = JSON.parse(fs.readFileSync(translationLogFile, 'utf8'));
    } catch (e) {
      console.error('Erreur lors de la lecture du fichier de suivi:', e);
    }
  }
  
  // Mettre à jour les entrées pour les fichiers traduits
  files.forEach(file => {
    translationLog[file] = {
      lastModified: fs.statSync(file).mtimeMs,
      lastTranslated: Date.now(),
      translatedVersions: {}
    };
    
    // Enregistrer les versions traduites pour chaque langue
    targetLanguages.forEach(lang => {
      translationLog[file].translatedVersions[lang.code] = true;
    });
  });
  
  // Enregistrer le journal mis à jour
  fs.writeFileSync(translationLogFile, JSON.stringify(translationLog, null, 2), 'utf8');
  
  // Ajouter le fichier de log au git pour qu'il soit poussé
  try {
    execSync('git add ' + translationLogFile);
  } catch (e) {
    console.error('Erreur lors de l\'ajout du fichier de log à git:', e);
  }
}

// Fonction pour créer un sitemap XML avec toutes les versions linguistiques
async function createSitemap() {
  // Tous les fichiers HTML à la racine
  const files = fs.readdirSync(sourceDir).filter(file => 
    file.endsWith('.html') && 
    fs.statSync(path.join(sourceDir, file)).isFile()
  );
  
  // Générer l'en-tête du sitemap
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  sitemap += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
  
  // Pour chaque fichier HTML
  for (const file of files) {
    // Calculer le chemin relatif de l'URL original
    const relativePath = file === 'index.html' ? '/' : `/${file}`;
    const absoluteUrl = `${domain}${relativePath}`;
    
    // Ajouter l'entrée au sitemap
    sitemap += '  <url>\n';
    sitemap += `    <loc>${absoluteUrl}</loc>\n`;
    
    // Ajouter les alternatives linguistiques
    sitemap += `    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl}" />\n`;
    sitemap += `    <xhtml:link rel="alternate" hreflang="${sourceLanguage}" href="${absoluteUrl}" />\n`;
    
    // Ajouter les alternatives pour chaque langue
    for (const lang of targetLanguages) {
      // Traduire le nom de fichier
      const translatedFilename = await translateAndSlugifyFilename(file, lang.code);
      const translatedPath = translatedFilename === 'index.html' ? '/' : `/${translatedFilename}`;
      
      sitemap += `    <xhtml:link rel="alternate" hreflang="${lang.code}" href="${domain}/${lang.code}${translatedPath}" />\n`;
    }
    
    // Ajouter la dernière modification
    const filePath = path.join(sourceDir, file);
    const stats = fs.statSync(filePath);
    const lastMod = stats.mtime.toISOString().split('T')[0];
    sitemap += `    <lastmod>${lastMod}</lastmod>\n`;
    
    sitemap += '  </url>\n';
  }
  
  sitemap += '</urlset>';
  
  return sitemap;
}

// Fonction principale pour traiter les fichiers
async function translateFiles() {
  console.log("Démarrage de la traduction du site web...");
  
  // Obtenir les fichiers modifiés ou jamais traduits
  const filesToTranslate = getModifiedFiles();
  
  if (filesToTranslate.length === 0) {
    console.log("Aucun fichier modifié à traduire.");
    
    // Mettre à jour quand même le sitemap pour s'assurer qu'il est à jour
    console.log("Mise à jour du sitemap multilingue...");
    const sitemap = await createSitemap();
    fs.writeFileSync(path.join(sourceDir, 'sitemap_multilingual.xml'), sitemap);
    console.log('✓ Sitemap multilingue mis à jour: sitemap_multilingual.xml');
    
    return;
  }
  
  console.log(`Trouvé ${filesToTranslate.length} fichier(s) HTML à traduire:`);
  filesToTranslate.forEach(file => console.log(` - ${file}`));
  
  // Créer les dossiers pour chaque langue
  targetLanguages.forEach(lang => {
    ensureDirectoryExists(path.join(sourceDir, lang.code));
  });
  
  // Traduire chaque fichier HTML modifié
  for (const file of filesToTranslate) {
    const filePath = path.join(sourceDir, file);
    const htmlContent = fs.readFileSync(filePath, 'utf8');
    
    console.log(`\nTraitement du fichier: ${file}`);
    
    // Pour chaque langue cible
    for (const lang of targetLanguages) {
      try {
        console.log(`\nTraduction en ${lang.name} (${lang.code})...`);
        
        // Traduire le nom du fichier (slug)
        const translatedFilename = await translateAndSlugifyFilename(path.basename(file), lang.code);
        console.log(`  Nom de fichier traduit: ${path.basename(file)} -> ${translatedFilename}`);
        
        // Traduire le contenu
        const translatedContent = await translateHtml(htmlContent, lang.code, file, translatedFilename);
        
        // Créer le chemin du dossier de destination
        const langDir = path.join(sourceDir, lang.code);
        ensureDirectoryExists(langDir);
        
        // Écrire le fichier traduit dans le dossier de la langue avec le nom traduit
        const outputPath = path.join(langDir, translatedFilename);
        fs.writeFileSync(outputPath, translatedContent);
        
        console.log(`✓ Fichier créé: ${lang.code}/${translatedFilename}`);
      } catch (error) {
        console.error(`✗ Erreur lors de la traduction en ${lang.name}: ${error}`);
      }
    }
  }
  
  // Mettre à jour le journal des traductions
  updateTranslationLog(filesToTranslate);
  
  // Créer ou mettre à jour le sitemap multilangues
  console.log("\nMise à jour du sitemap multilingue...");
  const sitemap = await createSitemap();
  
  // Écrire le fichier sitemap.xml à la racine (remplacer l'existant s'il existe)
  fs.writeFileSync(path.join(sourceDir, 'sitemap_multilingual.xml'), sitemap);
  console.log('✓ Sitemap multilingue créé: sitemap_multilingual.xml');
  
  console.log("\nTraduction terminée!");
}

// Exécuter la fonction principale
translateFiles().catch(error => {
  console.error("Erreur générale:", error);
  process.exit(1);
});
