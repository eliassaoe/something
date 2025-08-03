#!/bin/bash
echo "🔧 Creating redirect pages..."

pages=("cdn-cgi/l/email-protection" "mortgage-types" "phantombuster-alternative" "sales-navigator-tips" "help" "healthcare-types" "blog/gmail-address-availability-check" "linkedin-scraping-guide" "restaurant-types" "sales-director-types" "integrations" "marketing-directors" "insurance-types" "mentions_legales" "base-demails.html" "features" "recherche-par-adresse-mail.html" "chrome-extension" "contact" "retail-types" "vp-sales-types" "email-des-entreprises.html" "politique_de_confidentialite" "data-quality" "blog/find-mobile-number-by-name-of-person")

for page in "${pages[@]}"; do
  dir=$(dirname "$page")
  [ "$dir" != "." ] && mkdir -p "$dir"
  
  file="$page"
  [[ ! "$page" =~ \.html$ ]] && file="$page.html"
  
  cat > "$file" << 'HTML'
<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Redirecting...</title><meta http-equiv="refresh" content="0; url=https://unlimited-leads.online/"><link rel="canonical" href="https://unlimited-leads.online/"><style>body{font-family:Arial,sans-serif;text-align:center;padding:50px 20px;background:#f5f5f5}.container{max-width:500px;margin:0 auto;background:white;padding:40px;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,0.1)}.spinner{border:3px solid #f3f3f3;border-top:3px solid #2563eb;border-radius:50%;width:30px;height:30px;animation:spin 1s linear infinite;margin:20px auto}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}a{color:#2563eb;text-decoration:none}</style></head><body><div class="container"><h1>Page Moved</h1><div class="spinner"></div><p>Redirecting to <a href="https://unlimited-leads.online/">UnlimitedLeads</a>...</p></div><script>window.location.replace("https://unlimited-leads.online/");</script></body></html>
HTML
  
  echo "✅ Created: $file"
done

echo "🎉 All 404 redirects created!"
