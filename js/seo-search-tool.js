// SEO Search Tool - Auto-inject into email list pages
// Save this as: js/seo-search-tool.js
(function() {
    'use strict';

    console.log('🔧 SEO Search Tool script loaded!');
    console.log('📄 Page title:', document.title);
    console.log('📍 Current URL:', window.location.href);

    // Configuration
    const CONFIG = {
        searchUrl: 'https://contacts-search.hamoureliasse.workers.dev/',
        countUrl: 'https://count-v2.hamoureliasse.workers.dev/',
        signupUrl: 'https://unlimited-leads.online/sign-up',
        maxFreeSearches: 10
    };

    // Check if keyword represents a country
    function isCountryKeyword(keyword) {
        const countryKeywords = [
            // North America
            'united states', 'usa', 'us', 'america', 'american', 'united states of america',
            'canada', 'canadian', 'north america', 'north american',
            'mexico', 'mexican',
            
            // Europe
            'united kingdom', 'uk', 'britain', 'british', 'england', 'english', 'scotland', 'scottish', 'wales', 'welsh', 'northern ireland',
            'france', 'french', 'paris',
            'germany', 'german', 'deutschland', 'berlin',
            'italy', 'italian', 'rome', 'milan',
            'spain', 'spanish', 'madrid', 'barcelona',
            'netherlands', 'dutch', 'holland', 'amsterdam',
            'sweden', 'swedish', 'stockholm',
            'norway', 'norwegian', 'oslo',
            'denmark', 'danish', 'copenhagen',
            'finland', 'finnish', 'helsinki',
            'belgium', 'belgian', 'brussels',
            'switzerland', 'swiss', 'zurich', 'geneva',
            'austria', 'austrian', 'vienna',
            'poland', 'polish', 'warsaw',
            'portugal', 'portuguese', 'lisbon',
            'ireland', 'irish', 'dublin',
            'czech republic', 'czech', 'prague',
            'greece', 'greek', 'athens',
            'hungary', 'hungarian', 'budapest',
            'romania', 'romanian', 'bucharest',
            'bulgaria', 'bulgarian', 'sofia',
            'croatia', 'croatian', 'zagreb',
            'slovenia', 'slovenian', 'ljubljana',
            'slovakia', 'slovak', 'bratislava',
            'estonia', 'estonian', 'tallinn',
            'latvia', 'latvian', 'riga',
            'lithuania', 'lithuanian', 'vilnius',
            'europe', 'european',
            
            // Asia
            'india', 'indian', 'mumbai', 'delhi', 'bangalore', 'chennai', 'kolkata', 'hyderabad',
            'china', 'chinese', 'beijing', 'shanghai', 'guangzhou', 'shenzhen',
            'japan', 'japanese', 'tokyo', 'osaka', 'kyoto',
            'south korea', 'korean', 'seoul', 'busan',
            'singapore', 'singaporean',
            'hong kong', 'hk',
            'malaysia', 'malaysian', 'kuala lumpur',
            'thailand', 'thai', 'bangkok',
            'philippines', 'filipino', 'manila',
            'indonesia', 'indonesian', 'jakarta',
            'vietnam', 'vietnamese', 'ho chi minh', 'hanoi',
            'taiwan', 'taiwanese', 'taipei',
            'israel', 'israeli', 'tel aviv', 'jerusalem',
            'uae', 'emirates', 'dubai', 'abu dhabi',
            'saudi arabia', 'saudi', 'riyadh',
            'asia', 'asian',
            
            // Oceania
            'australia', 'australian', 'sydney', 'melbourne', 'brisbane', 'perth', 'adelaide',
            'new zealand', 'kiwi', 'auckland', 'wellington',
            'oceania',
            
            // Africa
            'south africa', 'south african', 'cape town', 'johannesburg',
            'nigeria', 'nigerian', 'lagos',
            'kenya', 'kenyan', 'nairobi',
            'egypt', 'egyptian', 'cairo',
            'morocco', 'moroccan', 'casablanca',
            'africa', 'african',
            
            // South America
            'brazil', 'brazilian', 'sao paulo', 'rio de janeiro',
            'argentina', 'argentinian', 'buenos aires',
            'chile', 'chilean', 'santiago',
            'colombia', 'colombian', 'bogota',
            'peru', 'peruvian', 'lima',
            'south america', 'latin america'
        ];

        const lowerKeyword = keyword.toLowerCase();
        return countryKeywords.some(country => {
            // Check for exact matches or if the keyword contains the country term
            return lowerKeyword === country || lowerKeyword.includes(country) || country.includes(lowerKeyword);
        });
    }

    // Country mapping based on keywords
    function getCountryFromKeyword(keyword) {
        const countryMap = {
            // North America
            'united states': 'United States',
            'usa': 'United States',
            'us': 'United States',
            'america': 'United States',
            'american': 'United States',
            'united states of america': 'United States',
            'north america': 'United States',
            'north american': 'United States',
            
            'canada': 'Canada',
            'canadian': 'Canada',
            
            'mexico': 'Mexico',
            'mexican': 'Mexico',
            
            // Europe
            'united kingdom': 'United Kingdom',
            'uk': 'United Kingdom',
            'britain': 'United Kingdom',
            'british': 'United Kingdom',
            'england': 'United Kingdom',
            'english': 'United Kingdom',
            'scotland': 'United Kingdom',
            'scottish': 'United Kingdom',
            'wales': 'United Kingdom',
            'welsh': 'United Kingdom',
            'northern ireland': 'United Kingdom',
            
            'france': 'France',
            'french': 'France',
            'paris': 'France',
            
            'germany': 'Germany',
            'german': 'Germany',
            'deutschland': 'Germany',
            'berlin': 'Germany',
            
            'italy': 'Italy',
            'italian': 'Italy',
            'rome': 'Italy',
            'milan': 'Italy',
            
            'spain': 'Spain',
            'spanish': 'Spain',
            'madrid': 'Spain',
            'barcelona': 'Spain',
            
            'netherlands': 'Netherlands',
            'dutch': 'Netherlands',
            'holland': 'Netherlands',
            'amsterdam': 'Netherlands',
            
            'sweden': 'Sweden',
            'swedish': 'Sweden',
            'stockholm': 'Sweden',
            
            'norway': 'Norway',
            'norwegian': 'Norway',
            'oslo': 'Norway',
            
            'denmark': 'Denmark',
            'danish': 'Denmark',
            'copenhagen': 'Denmark',
            
            'finland': 'Finland',
            'finnish': 'Finland',
            'helsinki': 'Finland',
            
            'belgium': 'Belgium',
            'belgian': 'Belgium',
            'brussels': 'Belgium',
            
            'switzerland': 'Switzerland',
            'swiss': 'Switzerland',
            'zurich': 'Switzerland',
            'geneva': 'Switzerland',
            
            'austria': 'Austria',
            'austrian': 'Austria',
            'vienna': 'Austria',
            
            'poland': 'Poland',
            'polish': 'Poland',
            'warsaw': 'Poland',
            
            'portugal': 'Portugal',
            'portuguese': 'Portugal',
            'lisbon': 'Portugal',
            
            'ireland': 'Ireland',
            'irish': 'Ireland',
            'dublin': 'Ireland',
            
            'czech republic': 'Czech Republic',
            'czech': 'Czech Republic',
            'prague': 'Czech Republic',
            
            'greece': 'Greece',
            'greek': 'Greece',
            'athens': 'Greece',
            
            'hungary': 'Hungary',
            'hungarian': 'Hungary',
            'budapest': 'Hungary',
            
            'romania': 'Romania',
            'romanian': 'Romania',
            'bucharest': 'Romania',
            
            'bulgaria': 'Bulgaria',
            'bulgarian': 'Bulgaria',
            'sofia': 'Bulgaria',
            
            'croatia': 'Croatia',
            'croatian': 'Croatia',
            'zagreb': 'Croatia',
            
            'slovenia': 'Slovenia',
            'slovenian': 'Slovenia',
            'ljubljana': 'Slovenia',
            
            'slovakia': 'Slovakia',
            'slovak': 'Slovakia',
            'bratislava': 'Slovakia',
            
            'estonia': 'Estonia',
            'estonian': 'Estonia',
            'tallinn': 'Estonia',
            
            'latvia': 'Latvia',
            'latvian': 'Latvia',
            'riga': 'Latvia',
            
            'lithuania': 'Lithuania',
            'lithuanian': 'Lithuania',
            'vilnius': 'Lithuania',
            
            // Default Europe mapping
            'europe': 'United Kingdom',
            'european': 'United Kingdom',
            
            // Asia
            'india': 'India',
            'indian': 'India',
            'mumbai': 'India',
            'delhi': 'India',
            'bangalore': 'India',
            'chennai': 'India',
            'kolkata': 'India',
            'hyderabad': 'India',
            
            'china': 'China',
            'chinese': 'China',
            'beijing': 'China',
            'shanghai': 'China',
            'guangzhou': 'China',
            'shenzhen': 'China',
            
            'japan': 'Japan',
            'japanese': 'Japan',
            'tokyo': 'Japan',
            'osaka': 'Japan',
            'kyoto': 'Japan',
            
            'south korea': 'South Korea',
            'korean': 'South Korea',
            'seoul': 'South Korea',
            'busan': 'South Korea',
            
            'singapore': 'Singapore',
            'singaporean': 'Singapore',
            
            'hong kong': 'Hong Kong',
            'hk': 'Hong Kong',
            
            'malaysia': 'Malaysia',
            'malaysian': 'Malaysia',
            'kuala lumpur': 'Malaysia',
            
            'thailand': 'Thailand',
            'thai': 'Thailand',
            'bangkok': 'Thailand',
            
            'philippines': 'Philippines',
            'filipino': 'Philippines',
            'manila': 'Philippines',
            
            'indonesia': 'Indonesia',
            'indonesian': 'Indonesia',
            'jakarta': 'Indonesia',
            
            'vietnam': 'Vietnam',
            'vietnamese': 'Vietnam',
            'ho chi minh': 'Vietnam',
            'hanoi': 'Vietnam',
            
            'taiwan': 'Taiwan',
            'taiwanese': 'Taiwan',
            'taipei': 'Taiwan',
            
            'israel': 'Israel',
            'israeli': 'Israel',
            'tel aviv': 'Israel',
            'jerusalem': 'Israel',
            
            'uae': 'United Arab Emirates',
            'emirates': 'United Arab Emirates',
            'dubai': 'United Arab Emirates',
            'abu dhabi': 'United Arab Emirates',
            
            'saudi arabia': 'Saudi Arabia',
            'saudi': 'Saudi Arabia',
            'riyadh': 'Saudi Arabia',
            
            // Default Asia mapping
            'asia': 'India',
            'asian': 'India',
            
            // Oceania
            'australia': 'Australia',
            'australian': 'Australia',
            'sydney': 'Australia',
            'melbourne': 'Australia',
            'brisbane': 'Australia',
            'perth': 'Australia',
            'adelaide': 'Australia',
            
            'new zealand': 'New Zealand',
            'kiwi': 'New Zealand',
            'auckland': 'New Zealand',
            'wellington': 'New Zealand',
            
            // Default Oceania mapping
            'oceania': 'Australia',
            
            // Africa
            'south africa': 'South Africa',
            'south african': 'South Africa',
            'cape town': 'South Africa',
            'johannesburg': 'South Africa',
            
            'nigeria': 'Nigeria',
            'nigerian': 'Nigeria',
            'lagos': 'Nigeria',
            
            'kenya': 'Kenya',
            'kenyan': 'Kenya',
            'nairobi': 'Kenya',
            
            'egypt': 'Egypt',
            'egyptian': 'Egypt',
            'cairo': 'Egypt',
            
            'morocco': 'Morocco',
            'moroccan': 'Morocco',
            'casablanca': 'Morocco',
            
            // Default Africa mapping
            'africa': 'South Africa',
            'african': 'South Africa',
            
            // South America
            'brazil': 'Brazil',
            'brazilian': 'Brazil',
            'sao paulo': 'Brazil',
            'rio de janeiro': 'Brazil',
            
            'argentina': 'Argentina',
            'argentinian': 'Argentina',
            'buenos aires': 'Argentina',
            
            'chile': 'Chile',
            'chilean': 'Chile',
            'santiago': 'Chile',
            
            'colombia': 'Colombia',
            'colombian': 'Colombia',
            'bogota': 'Colombia',
            
            'peru': 'Peru',
            'peruvian': 'Peru',
            'lima': 'Peru',
            
            // Default South America mapping
            'south america': 'Brazil',
            'latin america': 'Brazil'
        };

        const lowerKeyword = keyword.toLowerCase();
        
        // First, try exact match
        if (countryMap[lowerKeyword]) {
            return countryMap[lowerKeyword];
        }
        
        // Then try partial matches, prioritizing longer matches first
        const sortedKeys = Object.keys(countryMap).sort((a, b) => b.length - a.length);
        
        for (let key of sortedKeys) {
            if (lowerKeyword.includes(key)) {
                return countryMap[key];
            }
        }
        
        return 'United States'; // Default fallback
    }

    // Check if keyword represents an industry rather than a job title
    function isIndustryKeyword(keyword) {
        const industryKeywords = [
            // Finance & Banking
            'banking', 'finance', 'financial', 'insurance', 'capital markets', 'venture capital', 'private equity',
            'banking and finance', 'banking and finance industry',
            
            // Healthcare & Medical
            'healthcare', 'medical', 'hospital', 'health care', 'biotechnology', 'pharmaceutical',
            'medical device', 'medical equipment', 'dental equipment', 'health wellness fitness',
            
            // Technology & IT
            'technology', 'software', 'computer software', 'information technology', 'it services', 
            'computer networking', 'computer security', 'network security', 'internet',
            'technology industry', 'computer software industry', 'computer networking industry',
            'computer and network security', 'internet industry',
            
            // Manufacturing & Industry
            'manufacturing', 'automotive', 'aviation', 'aerospace', 'chemicals', 'machinery',
            'electrical manufacturing', 'electronic manufacturing', 'building materials',
            'packaging', 'printing', 'publishing', 'printing and publishing',
            'aviation and aerospace', 'chemicals industry', 'machinery industry',
            'electrical and electronic manufacturing',
            
            // Energy & Utilities
            'oil', 'gas', 'utilities', 'mining', 'clean energy', 'renewable energy', 'solar energy',
            'wind energy', 'environmental services', 'utilities industry',
            
            // Construction & Real Estate
            'construction', 'real estate', 'property', 'architecture', 'planning', 'civil engineering',
            'architecture and planning', 'civil engineering industry',
            
            // Retail & Consumer
            'retail', 'consumer goods', 'consumer electronics', 'consumer services', 'wholesale',
            'apparel', 'fashion', 'furniture', 'luxury goods', 'jewelry',
            'consumer goods industry', 'consumer electronics industry', 'consumer services industry',
            'apparel and fashion', 'luxury goods and jewelry', 'furniture industry',
            
            // Food & Agriculture
            'agriculture', 'food', 'beverages', 'food production', 'wine', 'spirits', 'restaurants',
            'food and beverages', 'food production industry', 'wine and spirits',
            
            // Transportation & Logistics
            'transportation', 'logistics', 'supply chain', 'warehousing', 'shipping', 'trucking',
            'railroad', 'maritime', 'airlines', 'aviation',
            'logistics and supply chain', 'warehousing industry', 'maritime industry',
            'airlines industry',
            
            // Media & Communications
            'media', 'media production', 'broadcasting', 'broadcast media', 'telecommunications', 
            'telecom', 'marketing', 'advertising',
            'media production industry', 'broadcast media industry', 'marketing and advertising',
            
            // Legal & Professional Services
            'legal services', 'legal', 'accounting', 'management consulting', 'staffing', 'recruiting',
            'management consulting industry', 'staffing and recruiting',
            
            // Government & Public
            'government', 'government administration', 'public safety', 'public administration',
            'political organization', 'civic organization', 'social organization',
            'government administration industry', 'public safety industry', 'political organization industry',
            'civic and social organization',
            
            // Education & Social Services
            'education', 'health wellness fitness', 'wellness', 'fitness',
            
            // Service Industries
            'call center', 'facility management', 'facilities management', 'janitorial services',
            'cleaning services', 'security services', 'events services', 'facilities services',
            'events services industry', 'facilities and services',
            
            // Creative & Design Industries
            'design', 'animation', 'arts', 'crafts', 'sporting goods', 'paper', 'forest products',
            'printing and publishing', 'textiles', 'defense', 'space', 'writing', 'editing',
            'business supplies', 'equipment',
            'design industry', 'animation industry', 'arts and crafts', 'sporting goods industry',
            'paper and forest products', 'defense and space', 'writing and editing',
            'business supplies and equipment',
            
            // Additional Industries
            'hospitality', 'leisure', 'travel', 'tourism', 'beauty', 'wholesale',
            'beauty industry', 'travel industry', 'wholesale industry', 'leisure industry',
            'environmental services industry'
        ];

        const lowerKeyword = keyword.toLowerCase();
        return industryKeywords.some(industry => {
            // Check for exact matches or if the keyword contains the industry term
            return lowerKeyword === industry || lowerKeyword.includes(industry) || industry.includes(lowerKeyword);
        });
    }

    // Industry mapping based on your exact industry list
    function getIndustryFromKeyword(keyword) {
        const industryMap = {
            // Medical & Healthcare
            'academic': 'Education',
            'accountant': 'Accounting',
            'accounting': 'Accounting',
            'lawyer': 'Legal services',
            'attorney': 'Legal services',
            'legal': 'Legal services',
            'legal services': 'Legal services',
            'law': 'Legal services',
            'law firm': 'Legal services',
            'law firms': 'Legal services',
            'bankruptcy lawyers': 'Legal services',
            'criminal lawyers': 'Legal services',
            'personal injury lawyers': 'Legal services',
            'doctor': 'Hospital & health care',
            'physician': 'Hospital & health care',
            'dentist': 'Hospital & health care',
            'dental': 'Hospital & health care',
            'nurse': 'Hospital & health care',
            'nursing': 'Hospital & health care',
            'nurses': 'Hospital & health care',
            'nurse practitioner': 'Hospital & health care',
            'nurse practitioners': 'Hospital & health care',
            'nurse parctitioners': 'Hospital & health care',
            'family nurse practitioners': 'Hospital & health care',
            'acute care nurse practitioners': 'Hospital & health care',
            'ambulatory care nurses': 'Hospital & health care',
            'occupational health nurses': 'Hospital & health care',
            'orthopedic nurses': 'Hospital & health care',
            'midwife nurses': 'Hospital & health care',
            'licensed practical nurse': 'Hospital & health care',
            'certified registered nurse anaesthetist': 'Hospital & health care',
            'dental hygenist': 'Hospital & health care',
            'denturists': 'Hospital & health care',
            'cardiovascular technologist': 'Hospital & health care',
            'pharmacist': 'Hospital & health care',
            'chiropractor': 'Health, Wellness & fitness',
            'veterinarian': 'Hospital & health care',
            'veterinary': 'Hospital & health care',
            'anesthesiologist': 'Hospital & health care',
            'cardiologist': 'Hospital & health care',
            'dermatologist': 'Hospital & health care',
            'gastroenterologist': 'Hospital & health care',
            'neurologist': 'Hospital & health care',
            'oncologist': 'Hospital & health care',
            'radiologist': 'Hospital & health care',
            'surgeon': 'Hospital & health care',
            'therapist': 'Health, Wellness & fitness',
            'massage': 'Health, Wellness & fitness',
            'spa': 'Health, Wellness & fitness',
            'healthcare': 'Hospital & health care',
            'hospital': 'Hospital & health care',
            'medical': 'Hospital & health care',
            'medical director': 'Hospital & health care',
            'medical device manufacturers': 'Hospital & health care',
            'dental equipment manufacturers': 'Hospital & health care',
            'blood bank centers': 'Hospital & health care',
            'ambulatory surgery centers': 'Hospital & health care',
            'clinics': 'Hospital & health care',
            'hospitals': 'Hospital & health care',
            'nursing homes': 'Hospital & health care',
            'med spa': 'Health, Wellness & fitness',
            'pharmacy': 'Hospital & health care',
            'emt': 'Hospital & health care',
            'paramedic': 'Hospital & health care',
            'audiologist': 'Hospital & health care',
            'epidemiologist': 'Hospital & health care',
            'immunologist': 'Hospital & health care',
            'pathologist': 'Hospital & health care',
            'pathology': 'Hospital & health care',
            'neonatologist': 'Hospital & health care',
            'nephrologist': 'Hospital & health care',
            'nephrology': 'Hospital & health care',
            'neurology': 'Hospital & health care',
            'neurosurgeons': 'Hospital & health care',
            'hematologist': 'Hospital & health care',
            'geriatrician': 'Hospital & health care',
            'geriatrics': 'Hospital & health care',
            'general practitioner': 'Hospital & health care',
            'general practitioners': 'Hospital & health care',
            'general surgery': 'Hospital & health care',
            'family medicine specialist': 'Hospital & health care',
            'family practitioners directors': 'Hospital & health care',
            'endocrinologist': 'Hospital & health care',
            'endodontists': 'Hospital & health care',
            'ent specialist': 'Hospital & health care',
            'ent specialists': 'Hospital & health care',
            'interventional cardiologists': 'Hospital & health care',
            'otolaryngologist': 'Hospital & health care',
            'oral pathologists': 'Hospital & health care',
            'oral surgeons': 'Hospital & health care',
            'orthodontist': 'Hospital & health care',
            'periodontist': 'Hospital & health care',
            'periodontis': 'Hospital & health care',
            'pediatric dentists': 'Hospital & health care',
            'peadiatric dentists': 'Hospital & health care',
            'prosthodontists': 'Hospital & health care',
            'cosmetic surgeons': 'Hospital & health care',
            'plastic surgeons': 'Hospital & health care',
            'gynecologist': 'Hospital & health care',
            'ophthalmologist': 'Hospital & health care',
            'psychiatrist': 'Hospital & health care',
            'psychologist': 'Health, Wellness & fitness',
            'pulmonologist': 'Hospital & health care',
            'rheumatologist': 'Hospital & health care',
            'rhinologists': 'Hospital & health care',
            'urologist': 'Hospital & health care',
            'nutritionist': 'Health, Wellness & fitness',
            'occupational therapist': 'Health, Wellness & fitness',
            'physical therapist': 'Health, Wellness & fitness',
            'physical therapy': 'Health, Wellness & fitness',
            'physician recruiters': 'Staffing & recruiting',
            'healthcare executives': 'Hospital & health care',
            'hospital ceo': 'Hospital & health care',
            'hospital cfo': 'Hospital & health care',
            'hospital cio': 'Hospital & health care',
            'hospital decision makers': 'Hospital & health care',
            'hospital procurement': 'Hospital & health care',
            'hipaa compliance managers': 'Hospital & health care',
            'chief of anesthesiology': 'Hospital & health care',
            'chief of pediatrics': 'Hospital & health care',
            
            // Construction & Trade Services
            'electrician': 'Construction',
            'hvac': 'Construction',
            'hvac technician': 'Construction',
            'welder': 'Construction',
            'roofer': 'Construction',
            'painter': 'Construction',
            'flooring installer': 'Construction',
            'carpet installer': 'Construction',
            'window installer': 'Construction',
            'solar panel installer': 'Clean energy',
            'architect': 'Architecture & planning',
            'engineer': 'Civil engineering',
            'construction': 'Construction',
            'contractor': 'Construction',
            'plumber': 'Construction',
            
            // Automotive & Mechanics
            'automotive mechanic': 'Automotive',
            'automotive': 'Automotive',
            'mechanic': 'Automotive',
            
            // Services & Repair
            'locksmith': 'Consumer services',
            'appliance repair': 'Consumer services',
            'appliance repair technician': 'Consumer services',
            
            // Landscaping & Environmental
            'landscaper': 'Environmental services & clean energy',
            'tree service': 'Environmental services & clean energy',
            'environmental consultant': 'Environmental services & clean energy',
            'waste management': 'Environmental services & clean energy',
            'environmental engineer': 'Environmental services & clean energy',
            'recycling': 'Environmental services & clean energy',
            'pest control': 'Environmental services & clean energy',
            
            // Creative & Design
            'graphic designer': 'Design',
            'photographer': 'Media production',
            'video producer': 'Media production',
            'film producer': 'Media production',
            'web designer': 'Design',
            'content creator': 'Media production',
            'copywriter': 'Writing & editing',
            'art director': 'Design',
            'design': 'Design',
            
            // Marketing & Advertising
            'marketing agency': 'Marketing & advertising',
            'advertising professional': 'Marketing & advertising',
            'social media manager': 'Marketing & advertising',
            'brand manager': 'Marketing & advertising',
            'marketing': 'Marketing & advertising',
            'marketing directors': 'Marketing & advertising',
            'advertising': 'Marketing & advertising',
            'sales director': 'Management consulting',
            
            // Beauty & Personal Care
            'hair stylist': 'Consumer services',
            'barber': 'Consumer services',
            'esthetician': 'Beauty & cosmetics',
            'nail technician': 'Beauty & cosmetics',
            'spa owner': 'Health, Wellness & fitness',
            'cosmetologist': 'Beauty & cosmetics',
            'beauty': 'Beauty & cosmetics',
            'beauty industry': 'Beauty & cosmetics',
            'cosmetics': 'Beauty & cosmetics',
            'beauty and cosmetics': 'Beauty & cosmetics',
            
            // Fitness & Wellness
            'personal trainer': 'Health, Wellness & fitness',
            'fitness instructor': 'Health, Wellness & fitness',
            'yoga instructor': 'Health, Wellness & fitness',
            'pilates instructor': 'Health, Wellness & fitness',
            'gym owner': 'Health, Wellness & fitness',
            'swimming instructor': 'Health, Wellness & fitness',
            
            // Emergency Services & Public Safety
            'firefighter': 'Public safety',
            'police': 'Public safety',
            'police department': 'Public safety',
            'security company': 'Computer & network security',
            'private security guard': 'Computer & network security',
            'security': 'Computer & network security',
            
            // Agriculture & Food
            'farmer': 'Agriculture',
            'livestock farmer': 'Agriculture',
            'crop farmer': 'Agriculture',
            'dairy farmer': 'Agriculture',
            'agricultural equipment dealer': 'Agriculture',
            'food processing company': 'Food production',
            'organic food producer': 'Food production',
            'agriculture': 'Agriculture',
            'food truck owner': 'Restaurants',
            'caterer': 'Events services',
            
            // Transportation & Logistics
            'logistics coordinator': 'Logistics & supply chain',
            'warehouse manager': 'Warehousing',
            'shipping company': 'Transportation',
            'freight broker': 'Transportation',
            'moving company': 'Transportation',
            'courier service': 'Transportation',
            'delivery service': 'Transportation',
            'transportation': 'Transportation',
            'trucking': 'Transportation',
            'railroad': 'Transportation',
            'logistics': 'Logistics & supply chain',
            'supply': 'Logistics & supply chain',
            'warehouse': 'Warehousing',
            
            // Social Services & Non-Profit
            'social worker': 'Civic & social organization',
            'non-profit organization': 'Civic & social organization',
            'family therapist': 'Health, Wellness & fitness',
            'mental health counselor': 'Health, Wellness & fitness',
            'community organizer': 'Civic & social organization',
            
            // Energy & Clean Technology
            'renewable energy company': 'Clean energy',
            'solar energy company': 'Clean energy',
            'wind energy company': 'Clean energy',
            'solar': 'Clean energy',
            'renewable energy': 'Clean energy',
            'clean energy': 'Clean energy',
            
            // Retail & Store Management
            'retail store manager': 'Retail',
            'retail store': 'Retail',
            'grocery store manager': 'Retail',
            'gas station owner': 'Retail',
            'convenience store owner': 'Retail',
            'pet store owner': 'Retail',
            'gift shop': 'Retail',
            'jewelry store': 'Retail',
            'auto dealer': 'Automotive',
            'car dealer': 'Automotive',
            'retail': 'Retail',
            
            // Cleaning & Facility Services
            'dry cleaner': 'Consumer services',
            'laundromat owner': 'Consumer services',
            'cleaning service': 'Facilities & services',
            'janitorial service': 'Facilities & services',
            'facility': 'Facilities & services',
            'facility managers': 'Facilities & services',
            
            // Sports & Recreation
            'sports coach': 'Sporting goods',
            'athletic director': 'Sporting goods',
            'recreation center': 'Leisure, Travel & tourism',
            'sports equipment dealer': 'Sporting goods',
            'golf pro': 'Leisure, Travel & tourism',
            'tennis instructor': 'Sporting goods',
            'golf': 'Leisure, Travel & tourism',
            
            // Government & Public Administration
            'mayor': 'Government administration',
            'city council': 'Government administration',
            'government employee': 'Government administration',
            'municipal worker': 'Government administration',
            'county official': 'Government administration',
            'state employee': 'Government administration',
            'government': 'Government administration',
            'public': 'Government administration',
            'political': 'Political organization',
            
            // Event Services
            'event planner': 'Events services',
            'wedding planner': 'Events services',
            'funeral director': 'Consumer services',
            'funeral home': 'Consumer services',
            'event': 'Events services',
            
            // Business & Executive
            'teacher': 'Education',
            'professor': 'Education',
            'principal': 'Education',
            'superintendent': 'Education',
            'librarian': 'Education',
            'ceo': 'Management consulting',
            'chief executive officer': 'Management consulting',
            'cfo': 'Finance',
            'chief financial officer': 'Finance',
            'cto': 'Information technology & services',
            'chief technology officer': 'Information technology & services',
            'cio': 'Information technology & services',
            'chief information officer': 'Information technology & services',
            'cmo': 'Marketing & advertising',
            'chief marketing officer': 'Marketing & advertising',
            'cdo': 'Management consulting',
            'chief data officer': 'Management consulting',
            'chief digital officer': 'Information technology & services',
            'chief operations officer': 'Management consulting',
            'coo': 'Management consulting',
            'chief revenue officer': 'Management consulting',
            'cro': 'Management consulting',
            'chief sales officer': 'Management consulting',
            'cso': 'Management consulting',
            'chief medical officer': 'Hospital & health care',
            'cmo medical': 'Hospital & health care',
            'chief information security officer': 'Computer & network security',
            'ciso': 'Computer & network security',
            'chief human resources officer': 'Staffing & recruiting',
            'chro': 'Staffing & recruiting',
            'chief nursing officer': 'Hospital & health care',
            'cno': 'Hospital & health care',
            'chief accounting officer': 'Accounting',
            'chief administrative officer': 'Management consulting',
            'chief investment officer': 'Venture capital & private equity',
            'vp': 'Management consulting',
            'vice president': 'Management consulting',
            'vp sales': 'Management consulting',
            'vp of sales': 'Management consulting',
            'vp business development': 'Management consulting',
            'vp of business development': 'Management consulting',
            'vp operations': 'Management consulting',
            'vp of operations': 'Management consulting',
            'executive assistant': 'Business supplies & equipment',
            'executive assistants': 'Business supplies & equipment',
            
            // Real Estate & Property
            'real estate': 'Real estate',
            'real estate agent': 'Real estate',
            'real estate brokers': 'Real estate',
            'realtor': 'Real estate',
            'property': 'Real estate',
            'property manager': 'Real estate',
            'property management companies': 'Real estate',
            
            // Hospitality & Food Service
            'restaurant': 'Restaurants',
            'hotel': 'Hospitality',
            'hotels': 'Hospitality',
            'travel': 'Leisure, Travel & tourism',
            'travel agencies': 'Leisure, Travel & tourism',
            'travel agency': 'Leisure, Travel & tourism',
            'travel agent': 'Leisure, Travel & tourism',
            'travel and tourism': 'Leisure, Travel & tourism',
            
            // Finance & Insurance
            'insurance': 'Insurance',
            'insurance agent': 'Insurance',
            'insurance agents': 'Insurance',
            'bank': 'Banking',
            'banking': 'Banking',
            'finance': 'Finance',
            'financial': 'Finance',
            'financial clerk': 'Finance',
            'loan officer': 'Banking',
            'mortgage broker': 'Banking',
            'mortgage brokers': 'Banking',
            'auditor': 'Accounting',
            'auditors': 'Accounting',
            'investor': 'Venture capital & private equity',
            'high net worth': 'Venture capital & private equity',
            'high net worth individuals': 'Venture capital & private equity',
            
            // Manufacturing & Industry
            'manufacturing': 'Manufacturing',
            'manufacturing manager': 'Manufacturing',
            'oil': 'Utilities',
            'gas': 'Utilities',
            'aviation': 'Aviation & aerospace',
            'aerospace': 'Aviation & aerospace',
            'biotechnology': 'Biotechnology',
            'pharmaceutical': 'Hospital & health care',
            'mining': 'Utilities',
            'telecommunications': 'Telecommunications',
            'telecom': 'Telecommunications',
            'printing': 'Printing & publishing',
            'publishing': 'Printing & publishing',
            'printing and publishing': 'Printing & publishing',
            'printing and publishing industry': 'Printing & publishing',
            'packaging': 'Paper & forest products',
            
            // Technology & IT
            'software': 'Computer software',
            'software engineers': 'Computer software',
            'it': 'Information technology & services',
            'it decision makers': 'Information technology & services',
            'msp': 'Information technology & services',
            'technology': 'Technology',
            'computer software': 'Computer software',
            'information technology': 'Information technology & services',
            
            // HR & Staffing
            'hr': 'Staffing & recruiting',
            'hr directors': 'Staffing & recruiting',
            'hr executives': 'Staffing & recruiting',
            'human resources': 'Staffing & recruiting',
            'recruiter': 'Staffing & recruiting',
            'recruiters': 'Staffing & recruiting',
            
            // Other Services
            'church': 'Civic & social organization',
            'pastor': 'Civic & social organization',
            'business owner': 'Business supplies & equipment',
            'wholesale': 'Wholesale',
            'food': 'Food & beverages',
            'beverage': 'Food & beverages',
            'wine': 'Wine & spirits',
            'spirits': 'Wine & spirits',
            'furniture': 'Furniture',
            'electronics': 'Consumer electronics',
            'machinery': 'Machinery',
            'chemicals': 'Chemicals',
            'textile': 'Apparel & fashion',
            'fashion': 'Apparel & fashion',
            'media': 'Media production',
            'broadcasting': 'Broadcast media',
            'internet': 'Internet',
            'safety': 'Public safety',
            'maritime': 'Maritime',
            'writing': 'Writing & editing',
            'editing': 'Writing & editing',
            
            // Additional Industry Terms
            'call center': 'Consumer services',
            'medical device': 'Hospital & health care',
            'medical equipment': 'Hospital & health care',
            'dental equipment': 'Hospital & health care',
            'facility management': 'Facilities & services',
            'facilities management': 'Facilities & services',
            
            // Missing Industry Keywords
            'travel industry': 'Leisure, Travel & tourism',
            'wholesale industry': 'Wholesale',
            'banking and finance industry': 'Banking',
            'aviation and aerospace industry': 'Aviation & aerospace',
            'technology industry': 'Technology',
            'airlines industry': 'Airlines/aviation',
            'animation industry': 'Animation',
            'apparel and fashion industry': 'Apparel & fashion',
            'architecture and planning industry': 'Architecture & planning',
            'arts and crafts industry': 'Arts & crafts',
            'broadcast media industry': 'Broadcast media',
            'building materials industry': 'Building materials',
            'business supplies and equipment industry': 'Business supplies & equipment',
            'capital markets industry': 'Capital markets',
            'chemicals industry': 'Chemicals',
            'civic and social organization industry': 'Civic & social organization',
            'civil engineering industry': 'Civil engineering',
            'computer and network security industry': 'Computer & network security',
            'computer networking industry': 'Computer networking',
            'computer software industry': 'Computer software',
            'consumer electronics industry': 'Consumer electronics',
            'consumer goods industry': 'Consumer goods',
            'consumer services industry': 'Consumer services',
            'defense and space industry': 'Defense & space',
            'design industry': 'Design',
            'electrical and electronic manufacturing industry': 'Electrical/electronic manufacturing',
            'environmental services industry': 'Environmental services & clean energy',
            'events services industry': 'Events services',
            'facilities and services industry': 'Facilities & services',
            'finance industry': 'Finance',
            'food and beverages industry': 'Food & beverages',
            'food production industry': 'Food production',
            'furniture industry': 'Furniture',
            'government administration industry': 'Government administration',
            'health wellness and fitness industry': 'Health, Wellness & fitness',
            'internet industry': 'Internet',
            'leisure industry': 'Leisure, Travel & tourism',
            'logistics and supply chain industry': 'Logistics & supply chain',
            'luxury goods and jewelry industry': 'Luxury goods & jewelry',
            'machinery industry': 'Machinery',
            'management consulting industry': 'Management consulting',
            'maritime industry': 'Maritime',
            'marketing and advertising industry': 'Marketing & advertising',
            'media production industry': 'Media production',
            'paper and forest products industry': 'Paper & forest products',
            'political organization industry': 'Political organization',
            'public safety industry': 'Public safety',
            'sporting goods industry': 'Sporting goods',
            'staffing and recruiting industry': 'Staffing & recruiting',
            'utilities industry': 'Utilities',
            'venture capital and private equity industry': 'Venture capital & private equity',
            'warehousing industry': 'Warehousing',
            'wine and spirits industry': 'Wine & spirits',
            'writing and editing industry': 'Writing & editing',
            
            // Additional Job Titles
            'small business owners': 'Business supplies & equipment',
            'professionals': 'Education',
            'cpa': 'Accounting',
            'canadian cfo': 'Finance',
            'cxo': 'Management consulting',
            'supply chain': 'Logistics & supply chain',
            'ada': 'Government administration'
        };

        const lowerKeyword = keyword.toLowerCase();
        
        // First, try exact match
        if (industryMap[lowerKeyword]) {
            return industryMap[lowerKeyword];
        }
        
        // Then try partial matches, prioritizing longer matches first
        const sortedKeys = Object.keys(industryMap).sort((a, b) => b.length - a.length);
        
        for (let key of sortedKeys) {
            if (lowerKeyword.includes(key)) {
                return industryMap[key];
            }
        }
        
        return 'Education'; // Default fallback
    }

    // Extract keyword from page title
    function extractKeyword() {
        const title = document.title.toLowerCase();
        
        // Pattern to match database pages - UPDATED
        const patterns = [
            /(\w+(?:\s+\w+)*)\s+database/i,
            /database\s+(?:of\s+)?(\w+(?:\s+\w+)*)/i,
            /(\w+(?:\s+\w+)*)\s+email\s+list/i,
            /email\s+list\s+(?:of\s+)?(\w+(?:\s+\w+)*)/i
        ];

        for (let pattern of patterns) {
            const match = title.match(pattern);
            if (match && match[1]) {
                console.log('✅ Keyword extracted:', match[1].trim());
                return match[1].trim();
            }
        }

        console.log('⚠️ No keyword match, using default: professional');
        return 'professional';
    }

    // Create the SEO search tool HTML
    function createSearchToolHTML(jobTitle, country, industry, displayKeyword) {
        return `
        <section style="padding: 4rem 0; background: #f9fafb; border-bottom: 1px solid #e5e7eb;">
            <div style="max-width: 1280px; margin: 0 auto; padding: 0 2rem;">
                <div style="background: white; border-radius: 1rem; padding: 2.5rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05); border: 1px solid #f3f4f6; max-width: 900px; margin: 0 auto;">
                    <h2 style="font-size: 2rem; font-weight: 700; text-align: center; margin-bottom: 0.5rem; color: #111827; font-family: 'Montserrat', sans-serif;">Search ${displayKeyword.charAt(0).toUpperCase() + displayKeyword.slice(1)} Database</h2>
                    <p style="text-align: center; color: #4b5563; margin-bottom: 2rem; font-size: 1.1rem;">Try our database with a live search preview</p>
                    
                    <form id="seoSearchForm" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
                        <div style="display: flex; flex-direction: column;">
                            <label style="font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Job Title</label>
                            <input type="text" id="seoJobTitle" name="jobTitle" placeholder="e.g. lawyer, manager, director" value="${jobTitle}" style="padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 0.5rem; font-size: 15px; transition: all 0.3s ease; background: white;">
                        </div>
                        
                        <div style="display: flex; flex-direction: column;">
                            <label style="font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Country</label>
                            <select id="seoCountry" name="country" style="padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 0.5rem; font-size: 15px; transition: all 0.3s ease; background: white;">
                                <option value="${country}">${country}</option>
                                <option value="">All Countries</option>
                                <option value="United States">United States</option>
                                <option value="Canada">Canada</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="Australia">Australia</option>
                                <option value="Germany">Germany</option>
                                <option value="France">France</option>
                                <option value="Netherlands">Netherlands</option>
                                <option value="Italy">Italy</option>
                                <option value="Spain">Spain</option>
                                <option value="India">India</option>
                                <option value="Sweden">Sweden</option>
                                <option value="Norway">Norway</option>
                                <option value="Denmark">Denmark</option>
                                <option value="Finland">Finland</option>
                                <option value="Belgium">Belgium</option>
                                <option value="Switzerland">Switzerland</option>
                                <option value="Austria">Austria</option>
                                <option value="Poland">Poland</option>
                                <option value="Portugal">Portugal</option>
                                <option value="Ireland">Ireland</option>
                                <option value="Czech Republic">Czech Republic</option>
                                <option value="Greece">Greece</option>
                                <option value="Hungary">Hungary</option>
                                <option value="Romania">Romania</option>
                                <option value="Bulgaria">Bulgaria</option>
                                <option value="Croatia">Croatia</option>
                                <option value="Slovenia">Slovenia</option>
                                <option value="Slovakia">Slovakia</option>
                                <option value="Estonia">Estonia</option>
                                <option value="Latvia">Latvia</option>
                                <option value="Lithuania">Lithuania</option>
                                <option value="China">China</option>
                                <option value="Japan">Japan</option>
                                <option value="South Korea">South Korea</option>
                                <option value="Singapore">Singapore</option>
                                <option value="Hong Kong">Hong Kong</option>
                                <option value="Malaysia">Malaysia</option>
                                <option value="Thailand">Thailand</option>
                                <option value="Philippines">Philippines</option>
                                <option value="Indonesia">Indonesia</option>
                                <option value="Vietnam">Vietnam</option>
                                <option value="Taiwan">Taiwan</option>
                                <option value="Israel">Israel</option>
                                <option value="United Arab Emirates">United Arab Emirates</option>
                                <option value="Saudi Arabia">Saudi Arabia</option>
                                <option value="New Zealand">New Zealand</option>
                                <option value="South Africa">South Africa</option>
                                <option value="Nigeria">Nigeria</option>
                                <option value="Kenya">Kenya</option>
                                <option value="Egypt">Egypt</option>
                                <option value="Morocco">Morocco</option>
                                <option value="Brazil">Brazil</option>
                                <option value="Argentina">Argentina</option>
                                <option value="Chile">Chile</option>
                                <option value="Colombia">Colombia</option>
                                <option value="Peru">Peru</option>
                                <option value="Mexico">Mexico</option>
                            </select>
                        </div>
                        
                        <div style="display: flex; flex-direction: column;">
                            <label style="font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Industry</label>
                            <select id="seoIndustry" name="industry" style="padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 0.5rem; font-size: 15px; transition: all 0.3s ease; background: white;">
                                <option value="${industry}">${industry}</option>
                                <option value="">All Industries</option>
                                <option value="Accounting">Accounting</option>
                                <option value="Agriculture">Agriculture</option>
                                <option value="Airlines/aviation">Airlines/aviation</option>
                                <option value="Animation">Animation</option>
                                <option value="Apparel & fashion">Apparel & fashion</option>
                                <option value="Architecture & planning">Architecture & planning</option>
                                <option value="Arts & crafts">Arts & crafts</option>
                                <option value="Automotive">Automotive</option>
                                <option value="Aviation & aerospace">Aviation & aerospace</option>
                                <option value="Banking">Banking</option>
                                <option value="Beauty & cosmetics">Beauty & cosmetics</option>
                                <option value="Biotechnology">Biotechnology</option>
                                <option value="Broadcast media">Broadcast media</option>
                                <option value="Building materials">Building materials</option>
                                <option value="Business supplies & equipment">Business supplies & equipment</option>
                                <option value="Capital markets">Capital markets</option>
                                <option value="Chemicals">Chemicals</option>
                                <option value="Civic & social organization">Civic & social organization</option>
                                <option value="Civil engineering">Civil engineering</option>
                                <option value="Clean energy">Clean energy</option>
                                <option value="Computer & network security">Computer & network security</option>
                                <option value="Computer networking">Computer networking</option>
                                <option value="Computer software">Computer software</option>
                                <option value="Construction">Construction</option>
                                <option value="Consumer electronics">Consumer electronics</option>
                                <option value="Consumer goods">Consumer goods</option>
                                <option value="Consumer services">Consumer services</option>
                                <option value="Defense & space">Defense & space</option>
                                <option value="Design">Design</option>
                                <option value="Education">Education</option>
                                <option value="Electrical/electronic manufacturing">Electrical/electronic manufacturing</option>
                                <option value="Environmental services & clean energy">Environmental services & clean energy</option>
                                <option value="Events services">Events services</option>
                                <option value="Facilities & services">Facilities & services</option>
                                <option value="Finance">Finance</option>
                                <option value="Food & beverages">Food & beverages</option>
                                <option value="Food production">Food production</option>
                                <option value="Furniture">Furniture</option>
                                <option value="Government administration">Government administration</option>
                                <option value="Health, Wellness & fitness">Health, Wellness & fitness</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Hospital & health care">Hospital & health care</option>
                                <option value="Hospitality">Hospitality</option>
                                <option value="Information technology & services">Information technology & services</option>
                                <option value="Insurance">Insurance</option>
                                <option value="Internet">Internet</option>
                                <option value="Legal services">Legal services</option>
                                <option value="Leisure, Travel & tourism">Leisure, Travel & tourism</option>
                                <option value="Logistics & supply chain">Logistics & supply chain</option>
                                <option value="Luxury goods & jewelry">Luxury goods & jewelry</option>
                                <option value="Machinery">Machinery</option>
                                <option value="Management consulting">Management consulting</option>
                                <option value="Manufacturing">Manufacturing</option>
                                <option value="Maritime">Maritime</option>
                                <option value="Marketing & advertising">Marketing & advertising</option>
                                <option value="Media production">Media production</option>
                                <option value="Paper & forest products">Paper & forest products</option>
                                <option value="Political organization">Political organization</option>
                                <option value="Printing & publishing">Printing & publishing</option>
                                <option value="Public safety">Public safety</option>
                                <option value="Real estate">Real estate</option>
                                <option value="Restaurants">Restaurants</option>
                                <option value="Retail">Retail</option>
                                <option value="Sporting goods">Sporting goods</option>
                                <option value="Staffing & recruiting">Staffing & recruiting</option>
                                <option value="Technology">Technology</option>
                                <option value="Telecommunications">Telecommunications</option>
                                <option value="Transportation">Transportation</option>
                                <option value="Utilities">Utilities</option>
                                <option value="Venture capital & private equity">Venture capital & private equity</option>
                                <option value="Warehousing">Warehousing</option>
                                <option value="Wholesale">Wholesale</option>
                                <option value="Wine & spirits">Wine & spirits</option>
                                <option value="Writing & editing">Writing & editing</option>
                            </select>
                        </div>
                        
                        <div style="display: flex; flex-direction: column;">
                            <label style="font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">City</label>
                            <input type="text" id="seoCity" name="city" placeholder="e.g. New York" style="padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 0.5rem; font-size: 15px; transition: all 0.3s ease; background: white;">
                        </div>
                        
                        <button type="submit" id="seoSearchBtn" style="grid-column: 1 / -1; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; border: none; padding: 1rem 2rem; border-radius: 0.5rem; font-size: 16px; font-weight: 700; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                            <i class="fas fa-search"></i>
                            <span>Search Database</span>
                        </button>
                    </form>

                    <div id="seoLoading" style="display: none; text-align: center; padding: 2rem; color: #4b5563;">
                        <i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: #2563eb; margin-bottom: 1rem;"></i>
                        <p>Searching database...</p>
                    </div>

                    <div id="seoResults" style="margin-top: 2rem; display: none;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding: 1rem; background: #eff6ff; border-radius: 0.5rem; flex-wrap: wrap; gap: 1rem;">
                            <div style="font-weight: 700; color: #1d4ed8; font-size: 1.1rem;">
                                Found <span id="seoResultsCount">0</span> contacts matching your criteria
                            </div>
                            <button id="seoExportBtn" style="background: linear-gradient(135deg, #10b981, #059669); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 0.5rem; font-weight: 700; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-download"></i>
                                Export All Results
                            </button>
                        </div>
                        
                        <table id="seoResultsTable" style="width: 100%; border-collapse: separate; border-spacing: 0; border-radius: 0.5rem; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #e5e7eb;">
                            <thead>
                                <tr>
                                    <th style="background: #f3f4f6; padding: 1rem; text-align: left; font-weight: 600; color: #374151; font-size: 14px;">Name</th>
                                    <th style="background: #f3f4f6; padding: 1rem; text-align: left; font-weight: 600; color: #374151; font-size: 14px;">Title</th>
                                    <th style="background: #f3f4f6; padding: 1rem; text-align: left; font-weight: 600; color: #374151; font-size: 14px;">Company</th>
                                    <th style="background: #f3f4f6; padding: 1rem; text-align: left; font-weight: 600; color: #374151; font-size: 14px;">Location</th>
                                    <th style="background: #f3f4f6; padding: 1rem; text-align: left; font-weight: 600; color: #374151; font-size: 14px;">Industry</th>
                                </tr>
                            </thead>
                            <tbody id="seoResultsBody">
                                <!-- Results will be populated here -->
                            </tbody>
                        </table>
                    </div>

                    <div id="seoSearchLimit" style="display: none; text-align: center; margin-top: 1rem; padding: 1rem; background: linear-gradient(135deg, #fef3c7, #fde68a); border: 1px solid #f59e0b; border-radius: 0.5rem; color: #92400e; font-weight: 600;">
                        <i class="fas fa-info-circle"></i>
                        You've reached your free search limit. <a href="${CONFIG.signupUrl}" style="color: #d97706; font-weight: 700;">Create an account</a> to continue searching and access unlimited contacts.
                    </div>
                </div>
            </div>
        </section>
        `;
    }

    // Add responsive styles
    function addResponsiveStyles() {
        if (document.getElementById('seo-tool-styles')) return;

        const style = document.createElement('style');
        style.id = 'seo-tool-styles';
        style.textContent = `
            #seoSearchForm input:focus,
            #seoSearchForm select:focus {
                outline: none !important;
                border-color: #2563eb !important;
                box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1) !important;
            }
            
            #seoSearchBtn:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(37, 99, 235, 0.4);
            }
            
            #seoSearchBtn:disabled {
                opacity: 0.6;
                cursor: not-allowed;
                transform: none;
            }
            
            #seoExportBtn:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 15px rgba(16, 185, 129, 0.4);
            }
            
            #seoResultsTable tr:hover {
                background: #f9fafb;
            }
            
            #seoResultsTable td {
                padding: 1rem;
                border-bottom: 1px solid #f3f4f6;
                color: #1f2937;
                font-size: 14px;
            }
            
            #seoResultsTable tr:last-child td {
                border-bottom: none;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .fa-spin {
                animation: spin 1s linear infinite;
            }
            
            @media (max-width: 768px) {
                #seoSearchForm {
                    grid-template-columns: 1fr !important;
                }
                
                #seoResults > div:first-child {
                    flex-direction: column !important;
                    align-items: stretch !important;
                }
                
                #seoExportBtn {
                    width: 100% !important;
                    justify-content: center !important;
                }
                
                #seoResultsTable {
                    font-size: 12px !important;
                }
                
                #seoResultsTable thead {
                    display: none !important;
                }
                
                #seoResultsTable,
                #seoResultsTable tbody,
                #seoResultsTable tr,
                #seoResultsTable td {
                    display: block !important;
                    width: 100% !important;
                }
                
                #seoResultsTable tr {
                    border: 1px solid #e5e7eb !important;
                    margin-bottom: 10px !important;
                    padding: 10px !important;
                    border-radius: 8px !important;
                    background: white !important;
                }
                
                #seoResultsTable td {
                    border: none !important;
                    border-bottom: 1px solid #f3f4f6 !important;
                    position: relative !important;
                    padding: 8px 0 8px 35% !important;
                    text-align: left !important;
                }
                
                #seoResultsTable td:before {
                    content: attr(data-label) ": " !important;
                    position: absolute !important;
                    left: 0 !important;
                    width: 30% !important;
                    padding-right: 10px !important;
                    white-space: nowrap !important;
                    font-weight: 600 !important;
                    color: #4b5563 !important;
                    font-size: 11px !important;
                }
                
                #seoResultsTable td:last-child {
                    border-bottom: none !important;
                }
            }
        `;
        document.head.appendChild(style);
        console.log('✅ Responsive styles added');
    }

    // Initialize search functionality
    function initializeSearchTool() {
        console.log('🚀 Initializing search tool functionality...');
        
        let searchCount = parseInt(localStorage.getItem('seoSearchCount') || '0');
        
        const seoSearchForm = document.getElementById('seoSearchForm');
        const seoSearchBtn = document.getElementById('seoSearchBtn');
        const seoExportBtn = document.getElementById('seoExportBtn');
        const seoLoading = document.getElementById('seoLoading');
        const seoResults = document.getElementById('seoResults');
        const seoResultsBody = document.getElementById('seoResultsBody');
        const seoResultsCount = document.getElementById('seoResultsCount');
        const seoSearchLimit = document.getElementById('seoSearchLimit');

        if (!seoSearchForm) {
            console.error('❌ seoSearchForm not found!');
            return;
        }

        console.log('✅ All form elements found');

        // Check search limit
        function checkSearchLimit() {
            if (searchCount >= CONFIG.maxFreeSearches) {
                seoSearchBtn.disabled = true;
                seoSearchBtn.innerHTML = '<i class="fas fa-lock"></i> Sign Up Required';
                seoSearchLimit.style.display = 'block';
            }
        }

        // Handle search
        seoSearchForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('🔍 Form submitted');

            if (searchCount >= CONFIG.maxFreeSearches) {
                window.location.href = CONFIG.signupUrl;
                return;
            }

            seoLoading.style.display = 'block';
            seoResults.style.display = 'none';
            seoSearchBtn.disabled = true;

            try {
                const jobTitle = document.getElementById('seoJobTitle').value;
                const country = document.getElementById('seoCountry').value;
                const industry = document.getElementById('seoIndustry').value;
                const city = document.getElementById('seoCity').value;

                console.log('🔎 Search params:', { jobTitle, country, industry, city });

                const searchParams = {
                    country: country,
                    industry: industry || undefined,
                    jobtitle: jobTitle || undefined,
                    city: city || undefined
                };

                // Get count
                const countResponse = await fetch(CONFIG.countUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(searchParams)
                });

                const countData = await countResponse.json();
                const totalCount = Array.isArray(countData) && countData[0] && countData[0].count 
                    ? parseInt(countData[0].count) : 0;

                console.log('📊 Total count:', totalCount);

                // Get sample results
                const searchResponse = await fetch(CONFIG.searchUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...searchParams,
                        limit: 5
                    })
                });

                const searchData = await searchResponse.json();
                console.log('📋 Results:', searchData.length);

                seoResultsCount.textContent = totalCount.toLocaleString();
                seoResultsBody.innerHTML = '';

                if (Array.isArray(searchData) && searchData.length > 0) {
                    searchData.forEach(contact => {
                        const row = document.createElement('tr');
                        const locationParts = [contact.city, contact.state, contact.country].filter(part => part && part.trim() !== '');
                        const location = locationParts.length > 0 ? locationParts.join(', ') : 'N/A';
                        
                        row.innerHTML = `
                            <td data-label="Name">${contact.name || 'N/A'}</td>
                            <td data-label="Title">${contact.title || 'N/A'}</td>
                            <td data-label="Company">${contact.company || 'N/A'}</td>
                            <td data-label="Location">${location}</td>
                            <td data-label="Industry">${contact.industry || 'N/A'}</td>
                        `;
                        seoResultsBody.appendChild(row);
                    });
                } else {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td colspan="5" style="text-align: center; padding: 2rem; color: #4b5563;">
                            <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>
                            No results found. Try different search criteria.
                        </td>
                    `;
                    seoResultsBody.appendChild(row);
                }

                seoResults.style.display = 'block';
                searchCount++;
                localStorage.setItem('seoSearchCount', searchCount.toString());
                checkSearchLimit();

            } catch (error) {
                console.error('❌ SEO Search Error:', error);
                seoResultsBody.innerHTML = `
                    <tr>
                        <td colspan="5" style="text-align: center; padding: 2rem; color: #ef4444;">
                            <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>
                            Error searching database. Please try again.
                        </td>
                    </tr>
                `;
                seoResults.style.display = 'block';
            } finally {
                seoLoading.style.display = 'none';
                if (searchCount < CONFIG.maxFreeSearches) {
                    seoSearchBtn.disabled = false;
                }
            }
        });

        // Handle export
        if (seoExportBtn) {
            seoExportBtn.addEventListener('click', function() {
                window.location.href = CONFIG.signupUrl;
            });
        }

        checkSearchLimit();
        console.log('✅ Search tool initialized successfully');
    }

    // Main initialization function
    function init() {
        console.log('🎬 Starting init function...');
        
        // Run on email list and database pages
        const pageTitle = document.title.toLowerCase();
        console.log('🔍 Checking page title:', pageTitle);
        
        if (!pageTitle.includes('email list') && !pageTitle.includes('database')) {
            console.log('❌ Page title does not match - exiting');
            return;
        }
        
        console.log('✅ Page title matches!');

        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            console.log('⏳ DOM still loading, waiting...');
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        console.log('✅ DOM ready');

        // Find target element (.hero section)
        let targetElement = document.querySelector('.hero');
        console.log('🎯 Target element (.hero):', targetElement);
        
        if (!targetElement) {
            console.warn('⚠️ .hero element not found, trying .stats-section...');
            targetElement = document.querySelector('.stats-section');
            console.log('🎯 Fallback target element (.stats-section):', targetElement);
        }
        
        if (!targetElement) {
            console.error('❌ No valid target element found!');
            return;
        }

        console.log('✅ Target element found!');

        // Extract keyword and determine what it represents
        const keyword = extractKeyword();
        const isCountry = isCountryKeyword(keyword);
        const isIndustry = !isCountry && isIndustryKeyword(keyword);
        
        console.log('🏷️ Keyword analysis:', {
            keyword,
            isCountry,
            isIndustry
        });
        
        // Set values based on keyword type
        let jobTitle, country, industry, displayKeyword;
        
        if (isCountry) {
            // If it's a country, set country and leave others empty
            jobTitle = '';
            country = getCountryFromKeyword(keyword);
            industry = '';
            displayKeyword = keyword;
        } else if (isIndustry) {
            // If it's an industry, set industry and leave job title empty
            jobTitle = '';
            country = 'United States'; // Default country
            industry = getIndustryFromKeyword(keyword);
            displayKeyword = keyword;
        } else {
            // If it's a job title, set job title and get industry mapping
            jobTitle = keyword;
            country = 'United States'; // Default country
            industry = getIndustryFromKeyword(keyword);
            displayKeyword = keyword;
        }
        
        console.log('📋 Final parameters:', {
            jobTitle,
            country,
            industry,
            displayKeyword
        });
        
        // Create and inject the search tool
        console.log('💉 Injecting HTML...');
        const searchToolHTML = createSearchToolHTML(jobTitle, country, industry, displayKeyword);
        targetElement.insertAdjacentHTML('afterend', searchToolHTML);
        console.log('✅ HTML injected');

        // Add styles and initialize functionality
        addResponsiveStyles();
        
        // Wait a bit for the HTML to be fully inserted
        console.log('⏳ Waiting 100ms for HTML to settle...');
        setTimeout(() => {
            console.log('🎯 Initializing search tool...');
            initializeSearchTool();
        }, 100);
    }

    // Start the initialization
    console.log('🚀 Script execution starting...');
    init();
})();
