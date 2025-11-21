import os
import re
import random

# Collect all database pages
database_pages = []
for file in os.listdir('.'):
    if file.endswith('-database.html'):
        database_pages.append(file)

print(f"Found {len(database_pages)} database pages")

# Create database info
DATABASE_LINKS = {}

for db_page in database_pages:
    base_name = db_page.replace('-database.html', '')
    
    DATABASE_LINKS[db_page] = {
        'url': f'https://unlimited-leads.online/{base_name}-database',
        'base_name': base_name
    }

def find_similar_databases(current_db_page, num=3):
    """Find similar database pages"""
    if current_db_page not in database_pages:
        return []
    
    current_base = DATABASE_LINKS[current_db_page]['base_name']
    current_words = set(current_base.split('-'))
    
    # Score other databases by similarity
    similarities = []
    for db_page in database_pages:
        if db_page == current_db_page:
            continue
        
        other_base = DATABASE_LINKS[db_page]['base_name']
        other_words = set(other_base.split('-'))
        
        # Calculate similarity
        common_words = current_words.intersection(other_words)
        score = len(common_words)
        
        # Bonus for same category
        if 'industry' in current_base and 'industry' in other_base:
            score += 2
        if any(word in current_base for word in ['nurse', 'doctor', 'medical', 'health']) and \
           any(word in other_base for word in ['nurse', 'doctor', 'medical', 'health']):
            score += 2
        if any(word in current_base for word in ['ceo', 'cfo', 'cto', 'cmo', 'executive']) and \
           any(word in other_base for word in ['ceo', 'cfo', 'cto', 'cmo', 'executive']):
            score += 2
        
        similarities.append((db_page, score))
    
    # Sort by similarity
    similarities.sort(key=lambda x: x[1], reverse=True)
    
    # Get top similar ones
    similar_dbs = [db for db, score in similarities[:10] if score > 0]
    if len(similar_dbs) < num:
        remaining = [db for db in database_pages if db != current_db_page and db not in similar_dbs]
        similar_dbs.extend(random.sample(remaining, min(num - len(similar_dbs), len(remaining))))
    
    return random.sample(similar_dbs, min(num, len(similar_dbs)))

def add_database_links(content, current_file):
    """Add links to 3 similar databases"""
    if current_file not in database_pages:
        return content
    
    if 'related-databases-box' in content or '<footer' not in content:
        return content
    
    similar_dbs = find_similar_databases(current_file, num=3)
    
    if not similar_dbs:
        return content
    
    box = '\n<div class="related-databases-box" style="max-width:700px;margin:40px auto;padding:24px;background:#f0fdf4;border-left:4px solid #10b981;border-radius:8px;">\n'
    box += '<p style="margin:0 0 16px;font-size:15px;font-weight:600;color:#065f46;">🔗 Related Databases:</p>\n'
    box += '<div style="display:flex;flex-direction:column;gap:10px;">\n'
    
    for db_page in similar_dbs:
        db_info = DATABASE_LINKS[db_page]
        title = db_info['base_name'].replace('-', ' ').title()
        box += f'<a href="{db_info["url"]}" style="padding:12px 16px;background:white;border:1px solid #bbf7d0;border-radius:6px;text-decoration:none;color:#047857;font-size:14px;transition:all 0.2s;display:block;">→ {title} Database</a>\n'
    
    box += '</div></div>\n\n'
    
    return content.replace('<footer', box + '<footer', 1)

# Process only database pages
count = 0

for file in database_pages:
    try:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        content = add_database_links(content, file)
        
        if content != original:
            with open(file, 'w', encoding='utf-8') as f:
                f.write(content)
            count += 1
            print(f"✓ {file}")
            
    except Exception as e:
        print(f"✗ {file}: {e}")

print(f"\n{'='*70}")
print(f"✅ Added database-to-database links to {count}/{len(database_pages)} pages")
print(f"🔗 Each database page links to 3 similar databases")
print(f"🎯 Strategy: Smart similarity matching + diversity")
print(f"{'='*70}")
