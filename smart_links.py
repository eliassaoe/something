#!/usr/bin/env python3
import os, re, glob

def get_relevant_links(page_name):
    """Get 3 relevant links based on the page type"""
    
    # Define related jobs for each category
    related_jobs = {
        "electrician": ["hvac-technician", "solar-panel-installer", "appliance-repair-technician"],
        "hvac-technician": ["electrician", "appliance-repair-technician", "solar-panel-installer"],
        "automotive-mechanic": ["welder", "locksmith", "appliance-repair-technician"],
        "welder": ["automotive-mechanic", "roofer", "locksmith"],
        "roofer": ["welder", "painter", "flooring-installer"],
        "painter": ["roofer", "flooring-installer", "carpet-installer"],
        "flooring-installer": ["painter", "carpet-installer", "landscaper"],
        "carpet-installer": ["flooring-installer", "painter", "cleaning-service"],
        "landscaper": ["tree-service", "flooring-installer", "pest-control-company"],
        "tree-service": ["landscaper", "roofer", "pest-control-company"],
        "locksmith": ["automotive-mechanic", "welder", "security-company"],
        "appliance-repair-technician": ["electrician", "hvac-technician", "locksmith"],
        "solar-panel-installer": ["electrician", "hvac-technician", "roofer"],
        "window-installer": ["roofer", "painter", "flooring-installer"],
        
        "graphic-designer": ["web-designer", "photographer", "marketing-agency"],
        "photographer": ["graphic-designer", "video-producer", "marketing-agency"],
        "video-producer": ["photographer", "film-producer", "marketing-agency"],
        "film-producer": ["video-producer", "photographer", "content-creator"],
        "marketing-agency": ["graphic-designer", "advertising-professional", "social-media-manager"],
        "advertising-professional": ["marketing-agency", "graphic-designer", "brand-manager"],
        "web-designer": ["graphic-designer", "social-media-manager", "content-creator"],
        "social-media-manager": ["web-designer", "content-creator", "marketing-agency"],
        "content-creator": ["social-media-manager", "copywriter", "web-designer"],
        "copywriter": ["content-creator", "marketing-agency", "advertising-professional"],
        "art-director": ["graphic-designer", "brand-manager", "marketing-agency"],
        "brand-manager": ["art-director", "marketing-agency", "advertising-professional"],
        
        "hair-stylist": ["barber", "cosmetologist", "spa-owner"],
        "barber": ["hair-stylist", "cosmetologist", "spa-owner"],
        "esthetician": ["cosmetologist", "spa-owner", "nail-technician"],
        "nail-technician": ["esthetician", "cosmetologist", "spa-owner"],
        "spa-owner": ["esthetician", "cosmetologist", "hair-stylist"],
        "cosmetologist": ["hair-stylist", "esthetician", "spa-owner"],
        
        "personal-trainer": ["fitness-instructor", "yoga-instructor", "gym-owner"],
        "fitness-instructor": ["personal-trainer", "yoga-instructor", "pilates-instructor"],
        "yoga-instructor": ["fitness-instructor", "pilates-instructor", "personal-trainer"],
        "pilates-instructor": ["yoga-instructor", "fitness-instructor", "gym-owner"],
        "gym-owner": ["personal-trainer", "fitness-instructor", "sports-coach"],
        
        "real-estate-agent": ["marketing-agency", "photographer", "cleaning-service"]
    }
    
    # Get the job name from page name
    job_name = page_name.replace("-email-list", "")
    
    # Get related jobs or default ones
    related = related_jobs.get(job_name, ["electrician", "real-estate-agent", "graphic-designer"])
    
    return related

def create_link_card(job_slug, title, icon, color):
    """Create HTML for one link card"""
    return f'''                <div style="background: white; padding: 1.75rem; border-radius: 0.75rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid var(--gray-100);">
                    <div style="width: 44px; height: 44px; background: {color}; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                        <span style="font-size: 1.25rem;">{icon}</span>
                    </div>
                    <h3 style="font-size: 1.1rem; margin-bottom: 0.75rem; color: var(--gray-900); font-weight: 700;">{title}</h3>
                    <p style="color: var(--gray-600); margin-bottom: 1.25rem; font-size: 0.9rem;">Access verified contact information for targeted marketing campaigns.</p>
                    <a href="https://unlimited-leads.online/{job_slug}-email-list" style="background: {color}; color: white; padding: 0.6rem 1.25rem; border-radius: 0.4rem; text-decoration: none; font-weight: 600; font-size: 0.9rem;">View Contacts →</a>
                </div>'''

def generate_links_section(page_name):
    """Generate the complete links section for a page"""
    
    # Job info database
    job_info = {
        "electrician": {"title": "Electrician Email List", "icon": "⚡", "color": "#f59e0b"},
        "hvac-technician": {"title": "HVAC Technician Email List", "icon": "🌡️", "color": "#3b82f6"},
        "automotive-mechanic": {"title": "Automotive Mechanic Email List", "icon": "🔧", "color": "#ef4444"},
        "welder": {"title": "Welder Email List", "icon": "🔥", "color": "#f97316"},
        "roofer": {"title": "Roofer Email List", "icon": "🏠", "color": "#8b5cf6"},
        "painter": {"title": "Painter Email List", "icon": "🎨", "color": "#06b6d4"},
        "flooring-installer": {"title": "Flooring Installer Email List", "icon": "🏗️", "color": "#84cc16"},
        "carpet-installer": {"title": "Carpet Installer Email List", "icon": "🧱", "color": "#a855f7"},
        "landscaper": {"title": "Landscaper Email List", "icon": "🌿", "color": "#84cc16"},
        "tree-service": {"title": "Tree Service Email List", "icon": "🌳", "color": "#10b981"},
        "locksmith": {"title": "Locksmith Email List", "icon": "🔐", "color": "#f59e0b"},
        "appliance-repair-technician": {"title": "Appliance Repair Technician Email List", "icon": "🔨", "color": "#10b981"},
        "solar-panel-installer": {"title": "Solar Panel Installer Email List", "icon": "☀️", "color": "#f59e0b"},
        "window-installer": {"title": "Window Installer Email List", "icon": "🪟", "color": "#06b6d4"},
        "graphic-designer": {"title": "Graphic Designer Email List", "icon": "🎨", "color": "#8b5cf6"},
        "photographer": {"title": "Photographer Email List", "icon": "📸", "color": "#06b6d4"},
        "video-producer": {"title": "Video Producer Email List", "icon": "🎬", "color": "#ef4444"},
        "film-producer": {"title": "Film Producer Email List", "icon": "🎭", "color": "#f97316"},
        "marketing-agency": {"title": "Marketing Agency Email List", "icon": "📈", "color": "#10b981"},
        "advertising-professional": {"title": "Advertising Professional Email List", "icon": "📢", "color": "#f59e0b"},
        "web-designer": {"title": "Web Designer Email List", "icon": "💻", "color": "#3b82f6"},
        "social-media-manager": {"title": "Social Media Manager Email List", "icon": "📱", "color": "#8b5cf6"},
        "content-creator": {"title": "Content Creator Email List", "icon": "✍️", "color": "#06b6d4"},
        "copywriter": {"title": "Copywriter Email List", "icon": "📝", "color": "#84cc16"},
        "art-director": {"title": "Art Director Email List", "icon": "🎨", "color": "#f97316"},
        "brand-manager": {"title": "Brand Manager Email List", "icon": "🏷️", "color": "#ef4444"},
        "hair-stylist": {"title": "Hair Stylist Email List", "icon": "💇", "color": "#8b5cf6"},
        "barber": {"title": "Barber Email List", "icon": "✂️", "color": "#3b82f6"},
        "esthetician": {"title": "Esthetician Email List", "icon": "🧴", "color": "#f97316"},
        "nail-technician": {"title": "Nail Technician Email List", "icon": "💅", "color": "#ef4444"},
        "spa-owner": {"title": "Spa Owner Email List", "icon": "🧖", "color": "#06b6d4"},
        "cosmetologist": {"title": "Cosmetologist Email List", "icon": "💄", "color": "#10b981"},
        "personal-trainer": {"title": "Personal Trainer Email List", "icon": "💪", "color": "#ef4444"},
        "fitness-instructor": {"title": "Fitness Instructor Email List", "icon": "🏃", "color": "#f97316"},
        "yoga-instructor": {"title": "Yoga Instructor Email List", "icon": "🧘", "color": "#8b5cf6"},
        "pilates-instructor": {"title": "Pilates Instructor Email List", "icon": "🤸", "color": "#06b6d4"},
        "gym-owner": {"title": "Gym Owner Email List", "icon": "🏋️", "color": "#10b981"},
        "real-estate-agent": {"title": "Real Estate Agent Email List", "icon": "🏡", "color": "#10b981"},
        "cleaning-service": {"title": "Cleaning Service Email List", "icon": "🧽", "color": "#06b6d4"},
        "pest-control-company": {"title": "Pest Control Company Email List", "icon": "🐛", "color": "#84cc16"},
        "security-company": {"title": "Security Company Email List", "icon": "🛡️", "color": "#8b5cf6"},
        "sports-coach": {"title": "Sports Coach Email List", "icon": "🏃", "color": "#ef4444"}
    }
    
    related_jobs = get_relevant_links(page_name)
    
    cards_html = ""
    for job_slug in related_jobs:
        if job_slug in job_info:
            info = job_info[job_slug]
            cards_html += create_link_card(job_slug, info["title"], info["icon"], info["color"]) + "\n"
    
    return f'''    <!-- Related Email Lists Section -->
    <section style="padding: 3rem 0; background: var(--gray-50);">
        <div class="container">
            <h2 style="font-size: 2rem; text-align: center; margin-bottom: 1rem; color: var(--gray-900); font-weight: 700;">Related Professional Email Lists</h2>
            <p style="text-align: center; color: var(--gray-600); margin-bottom: 2.5rem; font-size: 1.1rem;">Expand your outreach with these specialized professional databases</p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 2rem;">
{cards_html}            </div>
            <div style="text-align: center; margin-top: 2rem;">
                <p style="color: var(--gray-600); font-size: 0.9rem;">💡 <strong>Pro Tip:</strong> Combine multiple email lists for comprehensive marketing campaigns.</p>
            </div>
        </div>
    </section>'''

def main():
    print("🚀 Adding RELEVANT internal links to each page...")
    
    files = glob.glob("*-email-list.html")
    print(f"📁 Found {len(files)} files")
    
    success = 0
    for file_path in files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if "Related Professional Email Lists" in content:
                print(f"⏭️  Skipping {file_path} (already has links)")
                continue
            
            # Generate relevant links for this specific page
            page_name = os.path.basename(file_path).replace('.html', '')
            links_section = generate_links_section(page_name)
            
            # Find footer and insert before it
            footer_pos = content.find('<footer')
            if footer_pos == -1:
                footer_pos = content.find('</body>')
            
            if footer_pos != -1:
                new_content = content[:footer_pos] + links_section + "\n\n" + content[footer_pos:]
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"✅ Updated {file_path} with relevant links")
                success += 1
            else:
                print(f"❌ Could not find footer in {file_path}")
        except Exception as e:
            print(f"❌ Error with {file_path}: {e}")
    
    print(f"\n🎉 SUCCESS! Updated {success} files with RELEVANT links")
    print("📋 Now run:")
    print("  git add .")
    print("  git commit -m 'Add relevant internal links to each page'")
    print("  git push")

if __name__ == "__main__":
    main()
