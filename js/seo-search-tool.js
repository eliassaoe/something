// Configuration mise à jour
const CONFIG = {
    searchUrl: 'https://contacts-search.hamoureliasse.workers.dev/',
    countUrl: 'https://count-v2.hamoureliasse.workers.dev/',
    signupUrl: 'https://unlimited-leads.online/sign-up',
    maxFreeSearches: 2
};

// Dans la fonction de recherche, remplacer cette partie :
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

        const searchParams = {
            country: country,
            industry: industry || undefined,
            jobtitle: jobTitle || undefined,
            city: city || undefined
        };

        // Get count - utilise maintenant countUrl
        const countResponse = await fetch(CONFIG.countUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(searchParams)
        });

        const countData = await countResponse.json();
        const totalCount = Array.isArray(countData) && countData[0] && countData[0].count 
            ? parseInt(countData[0].count) : 0;

        // Get sample results - utilise maintenant searchUrl
        const searchResponse = await fetch(CONFIG.searchUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...searchParams,
                limit: 5
            })
        });

        const searchData = await searchResponse.json();

        // Le reste du code reste identique...
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
