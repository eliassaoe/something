// Professional B2B popup - 20 seconds delay
(function() {
    'use strict';
    
    let popupShown = false;

    setTimeout(function() {
        if (!popupShown && !sessionStorage.getItem('leadPopupShown')) {
            showLeadPopup();
            popupShown = true;
            sessionStorage.setItem('leadPopupShown', 'true');
        }
    }, 20000);

    function showLeadPopup() {
        const overlay = document.createElement('div');
        overlay.style.cssText = 
            'position: fixed; top: 0; left: 0; right: 0; bottom: 0;' +
            'background: rgba(15, 23, 42, 0.85); z-index: 99999;' +
            'display: flex; align-items: center; justify-content: center;' +
            'backdrop-filter: blur(10px);' +
            'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;';
        
        overlay.innerHTML = 
            '<div style="' +
                'background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);' +
                'padding: 0; border-radius: 16px; max-width: 520px; width: 90%;' +
                'box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);' +
                'position: relative; overflow: hidden;' +
            '">' +
                '<div style="' +
                    'background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);' +
                    'padding: 24px 32px 20px; color: white; position: relative;' +
                '">' +
                    '<span onclick="this.parentElement.parentElement.parentElement.remove()" style="' +
                        'position: absolute; top: 16px; right: 20px; cursor: pointer;' +
                        'font-size: 24px; color: rgba(255,255,255,0.8); font-weight: 300;' +
                        'width: 32px; height: 32px; display: flex; align-items: center;' +
                        'justify-content: center; border-radius: 50%;' +
                    '">&times;</span>' +
                    '<h3 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 700;">Scale Your Lead Generation</h3>' +
                    '<p style="margin: 0; font-size: 15px; opacity: 0.9;">Join 10,000+ professionals already using our platform</p>' +
                '</div>' +
                '<div style="padding: 32px;">' +
                    '<div style="background: #f1f5f9; border-left: 4px solid #3b82f6; padding: 20px; margin-bottom: 24px; border-radius: 8px;">' +
                        '<p style="margin: 0 0 12px 0; font-size: 16px; color: #334155; font-weight: 600;">Get instant access to 250 premium business contacts:</p>' +
                        '<ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 14px;">' +
                            '<li>Verified email addresses</li>' +
                            '<li>Direct phone numbers</li>' +
                            '<li>LinkedIn profile data</li>' +
                            '<li>Company information</li>' +
                        '</ul>' +
                    '</div>' +
                    '<button onclick="window.location.href=\'sign-up.html\'" style="' +
                        'background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);' +
                        'color: white; padding: 16px 24px; border: none; border-radius: 8px;' +
                        'font-weight: 600; cursor: pointer; font-size: 16px; width: 100%;' +
                        'box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);' +
                    '">Start Free Trial</button>' +
                    '<p style="text-align: center; margin: 16px 0 0 0; font-size: 12px; color: #64748b;">' +
                        'No credit card required • Cancel anytime • GDPR compliant' +
                    '</p>' +
                '</div>' +
            '</div>';
        
        document.body.appendChild(overlay);
        
        // Track if analytics available
        if (typeof plausible !== 'undefined') {
            plausible('Professional Popup Shown');
        }
    }
})();
