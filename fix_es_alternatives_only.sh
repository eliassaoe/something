#!/bin/bash
echo "Fixing alternative links in Spanish pages..."
for file in es/*alternative*.html; do
    if [ -f "$file" ]; then
        echo "Processing: $file"
        # Fix alternative links to include /es/ prefix
        sed -i 's|href="https://unlimited-leads\.online/\([^/"]*-alternative[^"]*\)"|href="https://unlimited-leads.online/es/\1"|g' "$file"
    fi
done
echo "Spanish alternative links fixed!"
