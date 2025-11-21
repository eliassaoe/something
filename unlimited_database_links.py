import os
import re
import random

# Collect all database pages dynamically
database_pages = []
for file in os.listdir('.'):
    if file.endswith('-database.html'):
        database_pages.append(file)

print(f"Found {len(database_pages)} database pages")

# Create link variations for each database page
DATABASE_LINKS = {}

for db_page in database_pages:
    # Extract the industry/profession from filename
    # e.g., "accountants-database.html" -> "accountants"
    base_name = db_page.replace('-database.html', '')
    
    # Create natural anchor variations
    anchors = [
        f'{base_name.replace("-", " ")} database',
        f'{base_name.replace("-", " ")} contact list',
        f'{base_name.replace("-", " ")} directory',
        f'find {base_name.replace("-", " ")}',
        f'{base_name.replace("-", " ")} information'
    ]
    
    DATABASE_LINKS[db_page] = {
        'url': f'https://unlimited-leads.online/{base_name}-database',
        'anchors': anchors,
        'keywords': [
            base_name.replace("-", " "),
            f'{base_name.replace("-", " ")} list',
            f'{base_name.replace("-", " ")} contacts',
            f'{base_name.replace("-", " ")} data'
        ]
    }

def distribute_database_links(content, current_file):
    """Add links to random database pages"""
    if current_file in database_pages:
        return content  # Don't link from database to database
    
    # Select 3-5 random database pages to link to
    num_links = min(5, len(database_pages))
    selected_databases = random.sample(database_pages, num_links)
    
    links_added = 0
    
    for db_page in selected_databases:
        if links_added >= 5:
            break
        
        db_info = DATABASE_LINKS[db_page]
        
        # Try to find natural placement for each keyword
        for keyword in db_info['keywords']:
            if links_added >= 5:
                break
            
            # Search case-insensitive in paragraphs
            pattern = f'(<p[^>]*>(?:(?!</p>).)*?)\\b({re.escape(keyword)})\\b((?:(?!</p>).)*?</p>)'
            match = re.search(pattern, content, re.IGNORECASE | re.DOTALL)
            
            if match and '<a href=' not in match.group(0):
                original_text = match.group(2)
                anchor = random.choice(db_info['anchors'])
                link_html = f'<a href="{db_info["url"]}">{anchor}</a>'
                
                # Replace the keyword with link
                new_paragraph = match.group(1) + link_html + match.group(3)
                content = content.replace(match.group(0), new_paragraph, 1)
                links_added += 1
                break
    
    return content

def add_database_box(content, current_file):
    """Add box with 3 random database links"""
    if current_file in database_pages:
        return content  # Don't add box to database pages
    
    if 'database-links-box' in content or '<footer' not in content:
        return content
    
    # Select 3 random database pages
    num_links = min(3, len(database_pages))
    selected = random.sample(database_pages, num_links)
    
    box = '\n<div class="database-links-box" style="max-width:700px;margin:40px auto;padding:24px;background:#f0f9ff;border-left:4px solid #0ea5e9;border-radius:8px;">\n'
    box += '<p style="margin:0 0 16px;font-size:15px;font-weight:600;color:#0c4a6e;">📊 Browse Our Databases:</p>\n'
    box += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;">\n'
    
    for db_page in selected:
        db_info = DATABASE_LINKS[db_page]
        base_name = db_page.replace('-database.html', '').replace('-', ' ').title()
        box += f'<a href="{db_info["url"]}" style="padding:10px 14px;background:white;border:1px solid #bae6fd;border-radius:6px;text-decoration:none;color:#0369a1;font-size:13px;transition:all 0.2s;display:block;text-align:center;">{base_name}</a>\n'
    
    box += '</div></div>\n\n'
    
    return content.replace('<footer', box + '<footer', 1)

# Process all HTML files
count_links = 0
count_boxes = 0
total_files = 0

skip_files = ['index.html', 'login.html', 'signup.html', 'sign-up.html', 'log-in.html', 
              'account.html', 'pricing.html', 'privacy-policy.html', 'terms.html',
              'confirmation-login.html', 'confirmation-signup.html', 'app.html', 'app-beta.html']

for file in os.listdir('.'):
    if file.endswith('.html') and file not in skip_files:
        total_files += 1
        try:
            with open(file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original = content
            
            # Add contextual links to database pages
            content = distribute_database_links(content, file)
            
            # Add database box
            content = add_database_box(content, file)
            
            if content != original:
                with open(file, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                if 'database-links-box' in content and 'database-links-box' not in original:
                    count_boxes += 1
                if content.count('<a href="https://unlimited-leads.online/') > original.count('<a href="https://unlimited-leads.online/'):
                    count_links += 1
                
                print(f"✓ {file}")
        except Exception as e:
            print(f"✗ {file}: {e}")

print(f"\n{'='*70}")
print(f"✅ Processed {total_files} HTML files")
print(f"📊 Found {len(database_pages)} database pages")
print(f"🔗 Added contextual links to {count_links} pages")
print(f"📦 Added database boxes to {count_boxes} pages")
print(f"💡 Strategy: Each page links to 5 random database pages")
print(f"🎯 Result: Database pages receive distributed link juice")
print(f"{'='*70}")
