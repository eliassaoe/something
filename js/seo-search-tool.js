// SEO Search Tool - Auto-inject into email list pages
// Save this as: js/seo-search-tool.js
(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        webhookUrl: 'https://email-finder-proxy-yellow-dawn-7aa3.hamoureliasse.workers.dev/api/webhook1',
        signupUrl: 'https://unlimited-leads.online/sign-up',
        maxFreeSearches: 2
    };

    // Industry mapping based on your exact industry list
    function getIndustryFromKeyword(keyword) {
        const industryMap = {
            'academic': 'Education',
            'accountant': 'Accounting',
            'accounting': 'Accounting',
            'lawyer': 'Legal services',
            'attorney': 'Legal services',
            'doctor': 'Hospital & health care',
            'physician': 'Hospital & health care',
            'dentist': 'Hospital & health care',
            'dental': 'Hospital & health care',
            'nurse': 'Hospital & health care',
            'nursing': 'Hospital & health care',
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
            'architect': 'Architecture & planning',
            'engineer': 'Civil engineering',
            'teacher': 'Education',
            'professor': 'Education',
            'principal': 'Education',
            'superintendent': 'Education',
            'librarian': 'Education',
            'ceo': 'Management consulting',
            'cfo': 'Finance',
            'cto': 'Information technology & services',
            'cio': 'Information technology & services',
            'cmo': 'Marketing & advertising',
            'real estate': 'Real estate',
            'realtor': 'Real estate',
            'restaurant': 'Restaurants',
            'hotel': 'Hospitality',
            'insurance': 'Insurance',
            'bank': 'Banking',
            'banking': 'Banking',
            'construction': 'Construction',
            'contractor': 'Construction',
            'manufacturing': 'Manufacturing',
            'oil': 'Utilities',
            'gas': 'Utilities',
            'automotive': 'Automotive',
            'agriculture': 'Agriculture',
            'aviation': 'Aviation & aerospace',
            'aerospace': 'Aviation & aerospace',
            'biotechnology': 'Biotechnology',
            'pharmaceutical': 'Hospital & health care',
            'mining': 'Utilities',
            'transportation': 'Transportation',
            'trucking': 'Transportation',
            'railroad': 'Transportation',
            'telecommunications': 'Telecommunications',
            'telecom': 'Telecommunications',
            'printing': 'Paper & forest products',
            'packaging': 'Paper & forest products',
            'facility': 'Facilities & services',
            'property': 'Real estate',
            'marketing': 'Marketing & advertising',
            'advertising': 'Marketing & advertising',
            'hr': 'Staffing & recruiting',
            'human resources': 'Staffing & recruiting',
            'recruiter': 'Staffing & recruiting',
            'travel': 'Leisure, Travel & tourism',
            'church': 'Civic & social organization',
            'pastor': 'Civic & social organization',
            'retail': 'Retail',
            'jewelry': 'Luxury goods & jewelry',
            'gift': 'Retail',
            'golf': 'Leisure, Travel & tourism',
            'event': 'Events services',
            'pest': 'Environmental services & clean energy',
            'plumber': 'Construction',
            'software': 'Computer software',
            'it': 'Information technology & services',
            'msp': 'Information technology & services',
            'business owner': 'Business supplies & equipment',
            'investor': 'Venture capital & private equity',
            'finance': 'Finance',
            'financial': 'Finance',
            'warehouse': 'Warehousing',
            'wholesale': 'Wholesale',
            'food': 'Food & beverages',
            'beverage': 'Food & beverages',
            'wine': 'Wine & spirits',
            'spirits': 'Wine & spirits',
            'design': 'Design',
            'furniture': 'Furniture',
            'electronics': 'Consumer electronics',
            'machinery': 'Machinery',
            'chemicals': 'Chemicals',
            'textile': 'Apparel & fashion',
            'fashion': 'Apparel & fashion',
            'media': 'Media production',
            'broadcasting': 'Broadcast media',
            'internet': 'Internet',
            'government': 'Government administration',
            'public': 'Government administration',
            'political': 'Political organization',
            'safety': 'Public safety',
            'security': 'Computer & network security',
            'logistics': 'Logistics & supply chain',
            'supply': 'Logistics & supply chain',
            'maritime': 'Maritime',
            'writing': 'Writing & editing',
            'editing': 'Writing & editing'
        };

        const lowerKeyword = keyword.toLowerCase();
        for (let [key, industry] of Object.entries(industryMap)) {
            if (lowerKeyword.includes(key)) {
                return industry;
            }
        }
        return 'Education'; // Default fallback
    }

    // Extract keyword from page title
    function extractKeyword() {
        const title = document.title.toLowerCase();
        
        // Pattern to match your email list pages
        const patterns = [
            /(\w+(?:\s+\w+)*)\s+email\s+list/i,
            /email\s+list\s+(?:of\s+)?(\w+(?:\s+\w+)*)/i
        ];

        for (let pattern of patterns) {
            const match = title.match(pattern);
            if (match && match[1]) {
                return match[1].trim();
            }
        }

        return 'professional';
    }

    // Create the SEO search tool HTML
    function createSearchToolHTML(keyword, industry) {
        return `
        <section style="padding: 4rem 0; background: #f9fafb; border-bottom: 1px solid #e5e7eb;">
            <div style="max-width: 1280px; margin: 0 auto; padding: 0 2rem;">
                <div style="background: white; border-radius: 1rem; padding: 2.5rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05); border: 1px solid #f3f4f6; max-width: 900px; margin: 0 auto;">
                    <h2 style="font-size: 2rem; font-weight: 700; text-align: center; margin-bottom: 0.5rem; color: #111827; font-family: 'Montserrat', sans-serif;">Search ${keyword.charAt(0).toUpperCase() + keyword.slice(1)} Database</h2>
                    <p style="text-align: center; color: #4b5563; margin-bottom: 2rem; font-size: 1.1rem;">Try our database with a live search preview</p>
                    
                    <form id="seoSearchForm" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
                        <div style="display: flex; flex-direction: column;">
                            <label style="font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Job Title</label>
                            <input type="text" id="seoJobTitle" name="jobTitle" placeholder="e.g. ${keyword}" value="${keyword}" style="padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 0.5rem; font-size: 15px; transition: all 0.3s ease; background: white;">
                        </div>
                        
                        <div style="display: flex; flex-direction: column;">
                            <label style="font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Country</label>
                            <select id="seoCountry" name="country" style="padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 0.5rem; font-size: 15px; transition: all 0.3s ease; background: white;">
                                <option value="United States">United States</option>
                                <option value="Canada">Canada</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="Australia">Australia</option>
                                <option value="Germany">Germany</option>
                                <option value="France">France</option>
                                <option value="Netherlands">Netherlands</option>
                                <option value="Italy">Italy</option>
                                <option value="Spain">Spain</option>
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
    }

    // Initialize search functionality
    function initializeSearchTool() {
        let searchCount = parseInt(localStorage.getItem('seoSearchCount') || '0');
        
        const seoSearchForm = document.getElementById('seoSearchForm');
        const seoSearchBtn = document.getElementById('seoSearchBtn');
        const seoExportBtn = document.getElementById('seoExportBtn');
        const seoLoading = document.getElementById('seoLoading');
        const seoResults = document.getElementById('seoResults');
        const seoResultsBody = document.getElementById('seoResultsBody');
        const seoResultsCount = document.getElementById('seoResultsCount');
        const seoSearchLimit = document.getElementById('seoSearchLimit');

        if (!seoSearchForm) return;

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

                // Get count
                const countResponse = await fetch(CONFIG.webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        action: 'getCount',
                        searchParams: {
                            country: country,
                            industry: industry || undefined,
                            jobtitle: jobTitle || undefined,
                            city: city || undefined
                        }
                    })
                });

                const countData = await countResponse.json();
                const totalCount = Array.isArray(countData) && countData[0] && countData[0].count 
                    ? parseInt(countData[0].count) : 0;

                // Get sample results
                const searchResponse = await fetch(CONFIG.webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        action: 'search',
                        searchParams: {
                            country: country,
                            industry: industry || undefined,
                            jobtitle: jobTitle || undefined,
                            city: city || undefined
                        },
                        limit: 5
                    })
                });

                const searchData = await searchResponse.json();

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
                console.error('SEO Search Error:', error);
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
    }

    // Main initialization function
    function init() {
        // Only run on email list pages
        const pageTitle = document.title.toLowerCase();
        if (!pageTitle.includes('email list')) {
            return;
        }

        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        // Find target element (.hero section)
        const targetElement = document.querySelector('.hero');
        if (!targetElement) {
            console.warn('SEO Search Tool: .hero element not found');
            return;
        }

        // Extract keyword and industry
        const keyword = extractKeyword();
        const industry = getIndustryFromKeyword(keyword);

        // Create and inject the search tool
        const searchToolHTML = createSearchToolHTML(keyword, industry);
        targetElement.insertAdjacentHTML('afterend', searchToolHTML);

        // Add styles and initialize functionality
        addResponsiveStyles();
        
        // Wait a bit for the HTML to be fully inserted
        setTimeout(initializeSearchTool, 100);
    }

    // Start the initialization
    init();
})();
