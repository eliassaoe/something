#!/bin/bash

echo "Fixing email list links in French pages..."

for file in fr/*email-list.html; do
    if [ -f "$file" ]; then
        echo "Processing: $file"
        
        # Replace the specific links we can see in the output
        sed -i 's|href="https://unlimited-leads\.online/small-business-owners-email-list "|href="https://unlimited-leads.online/fr/small-business-owners-email-list "|g' "$file"
        sed -i 's|href="https://unlimited-leads\.online/ceo-email-list "|href="https://unlimited-leads.online/fr/ceo-email-list "|g' "$file"
        
        # More general pattern to catch any other similar links
        sed -i 's|href="https://unlimited-leads\.online/\([a-zA-Z0-9-]*-email-list\) "|href="https://unlimited-leads.online/fr/\1 "|g' "$file"
    fi
done

echo "Done! Checking one file to verify..."
grep -o 'href="https://unlimited-leads\.online/[^"]*email-list[^"]*"' fr/business-owner-email-list.html | head -5
