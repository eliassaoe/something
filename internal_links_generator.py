#!/bin/bash

# GitHub Codespace Setup Script for UnlimitedLeads Internal Links Generator
# This script sets up and runs the internal links generator

echo "🚀 UnlimitedLeads Internal Links Generator Setup"
echo "=============================================="

# Create the Python script
echo "📝 Creating internal links generator script..."
cat > internal_links_generator.py << 'EOF'
#!/usr/bin/env python3
"""
Internal Links Generator for UnlimitedLeads Email List Pages
This script adds a "Related Professional Email Lists" section to all email list pages
with 3 relevant internal links for each page.
"""

import os
import re
from typing import Dict, List, Tuple

# Define all email list pages and their categories
EMAIL_LISTS = {
    # Construction & Trades
    "electrician-email-list": {
        "title": "Electrician Email List",
        "category": "construction",
        "icon": "⚡",
        "color": "#f59e0b"
    },
    "hvac-technician-email-list": {
        "title": "HVAC Technician Email List", 
        "category": "construction",
        "icon": "🌡️",
        "color": "#3b82f6"
    },
    "automotive-mechanic-email-list": {
        "title": "Automotive Mechanic Email List",
        "category": "construction", 
        "icon": "🔧",
        "color": "#ef4444"
    },
    "welder-email-list": {
        "title": "Welder Email List",
        "category": "construction",
        "icon": "🔥",
        "color": "#f97316"
    },
    "roofer-email-list": {
        "title": "Roofer Email List",
        "category": "construction",
        "icon": "🏠",
        "color": "#8b5cf6"
    },
    "painter-email-list": {
        "title": "Painter Email List",
        "category": "construction",
        "icon": "🎨",
        "color": "#06b6d4"
    },
    "flooring-installer-email-list": {
        "title": "Flooring Installer Email List",
        "category": "construction",
        "icon": "🏗️",
        "color": "#84cc16"
    },
    "carpet-installer-email-list": {
        "title": "Carpet Installer Email List",
        "category": "construction",
        "icon": "🧱",
        "color": "#a855f7"
    },
    "locksmith-email-list": {
        "title": "Locksmith Email List",
        "category": "construction",
        "icon": "🔐",
        "color": "#f59e0b"
    },
    "appliance-repair-technician-email-list": {
        "title": "Appliance Repair Technician Email List",
        "category": "construction",
        "icon": "🔨",
        "color": "#10b981"
    },
    "solar-panel-installer-email-list": {
        "title": "Solar Panel Installer Email List",
        "category": "construction",
        "icon": "☀️",
        "color": "#f59e0b"
    },
    "window-installer-email-list": {
        "title": "Window Installer Email List",
        "category": "construction",
        "icon": "🪟",
        "color": "#06b6d4"
    },
    
    # Creative & Marketing
    "graphic-designer-email-list": {
        "title": "Graphic Designer Email List",
        "category": "creative",
        "icon": "🎨",
        "color": "#8b5cf6"
    },
    "photographer-email-list": {
        "title": "Photographer Email List",
        "category": "creative",
        "icon": "📸",
        "color": "#06b6d4"
    },
    "video-producer-email-list": {
        "title": "Video Producer Email List",
        "category": "creative",
        "icon": "🎬",
        "color": "#ef4444"
    },
    "film-producer-email-list": {
        "title": "Film Producer Email List",
        "category": "creative",
        "icon": "🎭",
        "color": "#f97316"
    },
    "marketing-agency-email-list": {
        "title": "Marketing Agency Email List",
        "category": "creative",
        "icon": "📈",
        "color": "#10b981"
    },
    "advertising-professional-email-list": {
        "title": "Advertising Professional Email List",
        "category": "creative",
        "icon": "📢",
        "color": "#f59e0b"
    },
    "web-designer-email-list": {
        "title": "Web Designer Email List",
        "category": "creative",
        "icon": "💻",
        "color": "#3b82f6"
    },
    "social-media-manager-email-list": {
        "title": "Social Media Manager Email List",
        "category": "creative",
        "icon": "📱",
        "color": "#8b5cf6"
    },
    "content-creator-email-list": {
        "title": "Content Creator Email List",
        "category": "creative",
        "icon": "✍️",
        "color": "#06b6d4"
    },
    "copywriter-email-list": {
        "title": "Copywriter Email List",
        "category": "creative",
        "icon": "📝",
        "color": "#84cc16"
    },
    "art-director-email-list": {
        "title": "Art Director Email List",
        "category": "creative",
        "icon": "🎨",
        "color": "#f97316"
    },
    "brand-manager-email-list": {
        "title": "Brand Manager Email List",
        "category": "creative",
        "icon": "🏷️",
        "color": "#ef4444"
    },
    
    # Beauty & Personal Care
    "hair-stylist-email-list": {
        "title": "Hair Stylist Email List",
        "category": "beauty",
        "icon": "💇",
        "color": "#8b5cf6"
    },
    "barber-email-list": {
        "title": "Barber Email List",
        "category": "beauty",
        "icon": "✂️",
        "color": "#3b82f6"
    },
    "esthetician-email-list": {
        "title": "Esthetician Email List",
        "category": "beauty",
        "icon": "🧴",
        "color": "#f97316"
    },
    "nail-technician-email-list": {
        "title": "Nail Technician Email List",
        "category": "beauty",
        "icon": "💅",
        "color": "#ef4444"
    },
    "spa-owner-email-list": {
        "title": "Spa Owner Email List",
        "category": "beauty",
        "icon": "🧖",
        "color": "#06b6d4"
    },
    "cosmetologist-email-list": {
        "title": "Cosmetologist Email List",
        "category": "beauty",
        "icon": "💄",
        "color": "#10b981"
    },
    
    # Fitness & Health
    "personal-trainer-email-list": {
        "title": "Personal Trainer Email List",
        "category": "fitness",
        "icon": "💪",
        "color": "#ef4444"
    },
    "fitness-instructor-email-list": {
        "title": "Fitness Instructor Email List",
        "category": "fitness",
        "icon": "🏃",
        "color": "#f97316"
    },
    "yoga-instructor-email-list": {
        "title": "Yoga Instructor Email List",
        "category": "fitness",
        "icon": "🧘",
        "color": "#8b5cf6"
    },
    "pilates-instructor-email-list": {
        "title": "Pilates Instructor Email List",
        "category": "fitness",
        "icon": "🤸",
        "color": "#06b6d4"
    },
    "gym-owner-email-list": {
        "title": "Gym Owner Email List",
        "category": "fitness",
        "icon": "🏋️",
        "color": "#10b981"
    },
    
    # Emergency & Safety
    "firefighter-email-list": {
        "title": "Firefighter Email List",
        "category": "emergency",
        "icon": "🚒",
        "color": "#ef4444"
    },
    "police-department-email-list": {
        "title": "Police Department Email List",
        "category": "emergency",
        "icon": "🚔",
        "color": "#3b82f6"
    },
    "emt-email-list": {
        "title": "EMT Email List",
        "category": "emergency",
        "icon": "🚑",
        "color": "#f97316"
    },
    "paramedic-email-list": {
        "title": "Paramedic Email List",
        "category": "emergency",
        "icon": "⚕️",
        "color": "#10b981"
    },
    "security-company-email-list": {
        "title": "Security Company Email List",
        "category": "emergency",
        "icon": "🛡️",
        "color": "#8b5cf6"
    },
    "private-security-guard-email-list": {
        "title": "Private Security Guard Email List",
        "category": "emergency",
        "icon": "👮",
        "color": "#06b6d4"
    },
    
    # Agriculture & Food
    "farmer-email-list": {
        "title": "Farmer Email List",
        "category": "agriculture",
        "icon": "🚜",
        "color": "#84cc16"
    },
    "livestock-farmer-email-list": {
        "title": "Livestock Farmer Email List",
        "category": "agriculture",
        "icon": "🐄",
        "color": "#f97316"
    },
    "crop-farmer-email-list": {
        "title": "Crop Farmer Email List",
        "category": "agriculture",
        "icon": "🌾",
        "color": "#f59e0b"
    },
    "dairy-farmer-email-list": {
        "title": "Dairy Farmer Email List",
        "category": "agriculture",
        "icon": "🥛",
        "color": "#06b6d4"
    },
    "agricultural-equipment-dealer-email-list": {
        "title": "Agricultural Equipment Dealer Email List",
        "category": "agriculture",
        "icon": "🚛",
        "color": "#8b5cf6"
    },
    "food-processing-company-email-list": {
        "title": "Food Processing Company Email List",
        "category": "agriculture",
        "icon": "🏭",
        "color": "#10b981"
    },
    "organic-food-producer-email-list": {
        "title": "Organic Food Producer Email List",
        "category": "agriculture",
        "icon": "🥬",
        "color": "#84cc16"
    },
    
    # Logistics & Transport
    "logistics-coordinator-email-list": {
        "title": "Logistics Coordinator Email List",
        "category": "logistics",
        "icon": "📦",
        "color": "#3b82f6"
    },
    "warehouse-manager-email-list": {
        "title": "Warehouse Manager Email List",
        "category": "logistics",
        "icon": "🏭",
        "color": "#8b5cf6"
    },
    "shipping-company-email-list": {
        "title": "Shipping Company Email List",
        "category": "logistics",
        "icon": "🚢",
        "color": "#06b6d4"
    },
    "freight-broker-email-list": {
        "title": "Freight Broker Email List",
        "category": "logistics",
        "icon": "🚚",
        "color": "#f97316"
    },
    "moving-company-email-list": {
        "title": "Moving Company Email List",
        "category": "logistics",
        "icon": "📦",
        "color": "#10b981"
    },
    "courier-service-email-list": {
        "title": "Courier Service Email List",
        "category": "logistics",
        "icon": "🏃",
        "color": "#ef4444"
    },
    "delivery-service-email-list": {
        "title": "Delivery Service Email List",
        "category": "logistics",
        "icon": "🚚",
        "color": "#f59e0b"
    },
    
    # Social & Mental Health
    "social-worker-email-list": {
        "title": "Social Worker Email List",
        "category": "social",
        "icon": "🤝",
        "color": "#10b981"
    },
    "non-profit-organization-email-list": {
        "title": "Non-Profit Organization Email List",
        "category": "social",
        "icon": "❤️",
        "color": "#ef4444"
    },
    "family-therapist-email-list": {
        "title": "Family Therapist Email List",
        "category": "social",
        "icon": "👨‍👩‍👧‍👦",
        "color": "#8b5cf6"
    },
    "mental-health-counselor-email-list": {
        "title": "Mental Health Counselor Email List",
        "category": "social",
        "icon": "🧠",
        "color": "#06b6d4"
    },
    "community-organizer-email-list": {
        "title": "Community Organizer Email List",
        "category": "social",
        "icon": "🏘️",
        "color": "#f97316"
    },
    
    # Environmental
    "environmental-consultant-email-list": {
        "title": "Environmental Consultant Email List",
        "category": "environmental",
        "icon": "🌱",
        "color": "#84cc16"
    },
    "waste-management-company-email-list": {
        "title": "Waste Management Company Email List",
        "category": "environmental",
        "icon": "♻️",
        "color": "#10b981"
    },
    "renewable-energy-company-email-list": {
        "title": "Renewable Energy Company Email List",
        "category": "environmental",
        "icon": "🔋",
        "color": "#06b6d4"
    },
    "solar-energy-company-email-list": {
        "title": "Solar Energy Company Email List",
        "category": "environmental",
        "icon": "☀️",
        "color": "#f59e0b"
    },
    "wind-energy-company-email-list": {
        "title": "Wind Energy Company Email List",
        "category": "environmental",
        "icon": "💨",
        "color": "#3b82f6"
    },
    "environmental-engineer-email-list": {
        "title": "Environmental Engineer Email List",
        "category": "environmental",
        "icon": "🌍",
        "color": "#84cc16"
    },
    "recycling-company-email-list": {
        "title": "Recycling Company Email List",
        "category": "environmental",
        "icon": "♻️",
        "color": "#10b981"
    },
    
    # Retail & Service
    "retail-store-manager-email-list": {
        "title": "Retail Store Manager Email List",
        "category": "retail",
        "icon": "🏪",
        "color": "#8b5cf6"
    },
    "grocery-store-manager-email-list": {
        "title": "Grocery Store Manager Email List",
        "category": "retail",
        "icon": "🛒",
        "color": "#10b981"
    },
    "gas-station-owner-email-list": {
        "title": "Gas Station Owner Email List",
        "category": "retail",
        "icon": "⛽",
        "color": "#ef4444"
    },
    "convenience-store-owner-email-list": {
        "title": "Convenience Store Owner Email List",
        "category": "retail",
        "icon": "🏪",
        "color": "#f97316"
    },
    "dry-cleaner-email-list": {
        "title": "Dry Cleaner Email List",
        "category": "retail",
        "icon": "👔",
        "color": "#06b6d4"
    },
    "laundromat-owner-email-list": {
        "title": "Laundromat Owner Email List",
        "category": "retail",
        "icon": "🧺",
        "color": "#3b82f6"
    },
    "pet-store-owner-email-list": {
        "title": "Pet Store Owner Email List",
        "category": "retail",
        "icon": "🐕",
        "color": "#f59e0b"
    },
    
    # Sports & Recreation
    "sports-coach-email-list": {
        "title": "Sports Coach Email List",
        "category": "sports",
        "icon": "🏃",
        "color": "#ef4444"
    },
    "athletic-director-email-list": {
        "title": "Athletic Director Email List",
        "category": "sports",
        "icon": "🏆",
        "color": "#f59e0b"
    },
    "recreation-center-email-list": {
        "title": "Recreation Center Email List",
        "category": "sports",
        "icon": "🏟️",
        "color": "#10b981"
    },
    "sports-equipment-dealer-email-list": {
        "title": "Sports Equipment Dealer Email List",
        "category": "sports",
        "icon": "⚽",
        "color": "#8b5cf6"
    },
    "golf-pro-email-list": {
        "title": "Golf Pro Email List",
        "category": "sports",
        "icon": "⛳",
        "color": "#84cc16"
    },
    "tennis-instructor-email-list": {
        "title": "Tennis Instructor Email List",
        "category": "sports",
        "icon": "🎾",
        "color": "#06b6d4"
    },
    "swimming-instructor-email-list": {
        "title": "Swimming Instructor Email List",
        "category": "sports",
        "icon": "🏊",
        "color": "#3b82f6"
    },
    
    # Government
    "mayor-email-list": {
        "title": "Mayor Email List",
        "category": "government",
        "icon": "🏛️",
        "color": "#8b5cf6"
    },
    "city-council-email-list": {
        "title": "City Council Email List",
        "category": "government",
        "icon": "🏛️",
        "color": "#3b82f6"
    },
    "government-employee-email-list": {
        "title": "Government Employee Email List",
        "category": "government",
        "icon": "👔",
        "color": "#10b981"
    },
    "municipal-worker-email-list": {
        "title": "Municipal Worker Email List",
        "category": "government",
        "icon": "🏢",
        "color": "#f97316"
    },
    "county-official-email-list": {
        "title": "County Official Email List",
        "category": "government",
        "icon": "📋",
        "color": "#06b6d4"
    },
    "state-employee-email-list": {
        "title": "State Employee Email List",
        "category": "government",
        "icon": "🗂️",
        "color": "#ef4444"
    },
    
    # Events & Services
    "food-truck-owner-email-list": {
        "title": "Food Truck Owner Email List",
        "category": "events",
        "icon": "🚚",
        "color": "#f97316"
    },
    "caterer-email-list": {
        "title": "Caterer Email List",
        "category": "events",
        "icon": "🍽️",
        "color": "#10b981"
    },
    "event-planner-email-list": {
        "title": "Event Planner Email List",
        "category": "events",
        "icon": "🎉",
        "color": "#8b5cf6"
    },
    "wedding-planner-email-list": {
        "title": "Wedding Planner Email List",
        "category": "events",
        "icon": "💒",
        "color": "#ef4444"
    },
    "funeral-director-email-list": {
        "title": "Funeral Director Email List",
        "category": "events",
        "icon": "⚱️",
        "color": "#6b7280"
    },
    "funeral-home-email-list": {
        "title": "Funeral Home Email List",
        "category": "events",
        "icon": "🏛️",
        "color": "#6b7280"
    },
    "pest-control-company-email-list": {
        "title": "Pest Control Company Email List",
        "category": "services",
        "icon": "🐛",
        "color": "#84cc16"
    },
    "cleaning-service-email-list": {
        "title": "Cleaning Service Email List",
        "category": "services",
        "icon": "🧽",
        "color": "#06b6d4"
    },
    "janitorial-service-email-list": {
        "title": "Janitorial Service Email List",
        "category": "services",
        "icon": "🧹",
        "color": "#3b82f6"
    },
    
    # Landscaping & Outdoor
    "landscaper-email-list": {
        "title": "Landscaper Email List",
        "category": "outdoor",
        "icon": "🌿",
        "color": "#84cc16"
    },
    "tree-service-email-list": {
        "title": "Tree Service Email List",
        "category": "outdoor",
        "icon": "🌳",
        "color": "#10b981"
    }
}

def get_related_pages(current_page: str, email_lists: Dict) -> List[Tuple[str, Dict]]:
    """Get 3 related pages for the current page based on category similarity"""
    current_info = email_lists[current_page]
    current_category = current_info["category"]
    
    # Get pages from same category
    same_category = [(page, info) for page, info in email_lists.items() 
                     if info["category"] == current_category and page != current_page]
    
    # Define related categories for cross-category linking
    related_categories = {
        "construction": ["outdoor", "services"],
        "creative": ["retail", "events"],
        "beauty": ["fitness", "retail"],
        "fitness": ["beauty", "sports"],
        "emergency": ["government", "services"],
        "agriculture": ["environmental", "logistics"],
        "logistics": ["agriculture", "retail"],
        "social": ["government", "events"],
        "environmental": ["agriculture", "construction"],
        "retail": ["services", "creative"],
        "sports": ["fitness", "events"],
        "government": ["emergency", "social"],
        "events": ["creative", "retail"],
        "services": ["construction", "retail"],
        "outdoor": ["construction", "environmental"]
    }
    
    # Get pages from related categories
    related_cats = related_categories.get(current_category, [])
    related_category_pages = [(page, info) for page, info in email_lists.items() 
                             if info["category"] in related_cats and page != current_page]
    
    # Combine and select 3 pages
    all_related = same_category + related_category_pages
    
    # Prioritize same category, then related categories
    selected_pages = []
    
    # First, add same category pages (up to 2)
    for page, info in same_category[:2]:
        selected_pages.append((page, info))
    
    # Then add related category pages to fill up to 3
    for page, info in related_category_pages:
        if len(selected_pages) >= 3:
            break
        if (page, info) not in selected_pages:
            selected_pages.append((page, info))
    
    # If still need more, add any remaining same category
    for page, info in same_category[2:]:
        if len(selected_pages) >= 3:
            break
        selected_pages.append((page, info))
    
    return selected_pages[:3]

def generate_related_section(current_page: str, email_lists: Dict) -> str:
    """Generate the HTML for the related email lists section"""
    related_pages = get_related_pages(current_page, email_lists)
    
    if len(related_pages) < 3:
        # If we don't have enough related pages, fill with any other pages
        other_pages = [(page, info) for page, info in email_lists.items() 
                      if page != current_page and (page, info) not in related_pages]
        related_pages.extend(other_pages[:3-len(related_pages)])
    
    cards_html = ""
    for i, (page_slug, page_info) in enumerate(related_pages):
        color = page_info["color"]
        title = page_info["title"]
        icon = page_info["icon"]
        url = f"https://unlimited-leads.online/{page_slug}"
        
        cards_html += f'''            <div style="background: white; padding: 1.75rem; border-radius: 0.75rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: all 0.3s ease; border: 1px solid var(--gray-100);">
                <div style="width: 44px; height: 44px; background: {color}; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                    <span style="font-size: 1.25rem;">{icon}</span>
                </div>
                <h3 style="font-size: 1.1rem; margin-bottom: 0.75rem; color: var(--gray-900); font-weight: 700;">{title}</h3>
                <p style="color: var(--gray-600); margin-bottom: 1.25rem; font-size: 0.9rem; line-height: 1.5;">Access verified contact information for targeted marketing campaigns and business outreach.</p>
                <a href="{url}" style="background: {color}; color: white; padding: 0.6rem 1.25rem; border-radius: 0.4rem; text-decoration: none; font-weight: 600; font-size: 0.9rem; display: inline-block; transition: all 0.2s ease;">View Contacts →</a>
            </div>'''
        
        if i < len(related_pages) - 1:
            cards_html += "\n"
    
    section_html = f'''    <!-- Related Email Lists Section -->
    <section style="padding: 3rem 0; background: var(--gray-50);">
        <div class="container">
            <h2 style="font-size: 2rem; text-align: center; margin-bottom: 1rem; color: var(--gray-900); font-weight: 700;">Related Professional Email Lists</h2>
            <p style="text-align: center; color: var(--gray-600); margin-bottom: 2.5rem; font-size: 1.1rem;">Expand your outreach with these specialized professional databases</p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 2rem;">
{cards_html}
            </div>
            <div style="text-align: center; margin-top: 2rem;">
                <p style="color: var(--gray-600); font-size: 0.9rem;">💡 <strong>Pro Tip:</strong> Combine multiple email lists for comprehensive marketing campaigns with higher conversion rates.</p>
            </div>
        </div>
    </section>'''
    
    return section_html

def update_html_file(file_path: str, current_page: str, email_lists: Dict):
    """Update an HTML file by adding the related sections"""
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return False
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if the related section already exists
        if "Related Professional Email Lists" in content:
            print(f"Related section already exists in {file_path}")
            return True
        
        # Generate the related section
        related_section = generate_related_section(current_page, email_lists)
        
        # Find insertion point (before footer)
        footer_pattern = r'<footer[^>]*class="footer"[^>]*>'
        footer_match = re.search(footer_pattern, content, re.IGNORECASE)
        
        if footer_match:
            # Insert before footer
            insertion_point = footer_match.start()
            new_content = (content[:insertion_point] + 
                          related_section + "\n\n" + 
                          content[insertion_point:])
        else:
            # If no footer found, insert before closing body tag
            body_pattern = r'</body>'
            body_match = re.search(body_pattern, content, re.IGNORECASE)
            if body_match:
                insertion_point = body_match.start()
                new_content = (content[:insertion_point] + 
                              related_section + "\n\n" + 
                              content[insertion_point:])
            else:
                print(f"Could not find insertion point in {file_path}")
                return False
        
        # Write updated content
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✅ Updated {file_path}")
        return True
        
    except Exception as e:
        print(f"❌ Error updating {file_path}: {str(e)}")
        return False

def main():
    """Main function to update all email list pages"""
    print("🚀 Starting Internal Links Generator for UnlimitedLeads")
    print(f"📊 Total pages to process: {len(EMAIL_LISTS)}")
    
    base_directory = input("Enter the base directory containing your HTML files (or press Enter for current directory): ").strip()
    if not base_directory:
        base_directory = "."
    
    success_count = 0
    failed_count = 0
    
    for page_slug in EMAIL_LISTS.keys():
        file_path = os.path.join(base_directory, f"{page_slug}.html")
        
        if update_html_file(file_path, page_slug, EMAIL_LISTS):
            success_count += 1
        else:
            failed_count += 1
    
    print("\n" + "="*50)
    print("📈 SUMMARY REPORT")
    print("="*50)
    print(f"✅ Successfully updated: {success_count} files")
    print(f"❌ Failed to update: {failed_count} files")
    print(f"📊 Total processed: {success_count + failed_count} files")
    
    if success_count > 0:
        print(f"\n🎉 Success! Internal links have been added to {success_count} pages.")
        print("Each page now has 3 relevant related professional email list links.")
    
    if failed_count > 0:
        print(f"\n⚠️  {failed_count} files could not be updated. Please check the file paths and permissions.")

if __name__ == "__main__":
    main()
EOF

# Make the script executable
chmod +x internal_links_generator.py

echo "✅ Script created successfully!"
echo ""
echo "📋 USAGE INSTRUCTIONS:"
echo "======================"
echo ""
echo "1. First, upload your HTML files to this Codespace"
echo "   - You can drag and drop files into the Explorer panel"
echo "   - Or use git clone if your files are in a repository"
echo ""
echo "2. Run the script:"
echo "   python3 internal_links_generator.py"
echo ""
echo "3. When prompted, enter the directory path containing your HTML files"
echo "   - Press Enter to use the current directory"
echo "   - Or specify a path like './html-files/' or '/path/to/your/files/'"
echo ""
echo "🎯 WHAT THE SCRIPT DOES:"
echo "========================"
echo "• Processes all $(python3 -c "exec(open('internal_links_generator.py').read()); print(len(EMAIL_LISTS))") email list pages"
echo "• Adds a 'Related Professional Email Lists' section to each page"
echo "• Each page gets 3 relevant internal links based on job category similarity"
echo "• Inserts the section before the footer automatically"
echo "• Preserves existing content and formatting"
echo ""
echo "🏷️  CATEGORIES INCLUDED:"
echo "========================"
echo "• Construction & Trades (12 pages)"
echo "• Creative & Marketing (12 pages)" 
echo "• Beauty & Personal Care (6 pages)"
echo "• Fitness & Health (5 pages)"
echo "• Emergency & Safety (6 pages)"
echo "• Agriculture & Food (7 pages)"
echo "• Logistics & Transport (7 pages)"
echo "• Social & Mental Health (5 pages)"
echo "• Environmental (7 pages)"
echo "• Retail & Service (7 pages)"
echo "• Sports & Recreation (7 pages)"
echo "• Government (6 pages)"
echo "• Events & Services (9 pages)"
echo "• Landscaping & Outdoor (2 pages)"
echo ""
echo "🚀 Ready to run! Execute: python3 internal_links_generator.py"
