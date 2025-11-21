// Repository display and statistics functionality

// Display list of all repositories
function displayRepositories(data) {
    const repoList = document.getElementById('repo-list');
    const lastUpdated = document.getElementById('last-updated');
    
    if (!repoList) return;
    
    // Display last updated time
    if (lastUpdated && data.last_updated) {
        const date = new Date(data.last_updated);
        lastUpdated.textContent = `⏰ Last updated: ${date.toLocaleString()}`;
    }
    
    // Clear existing content
    repoList.innerHTML = '';
    
    if (!data.repositories || data.repositories.length === 0) {
        repoList.innerHTML = '<p class="info-text">📭 No repositories found. Statistics will be updated soon.</p>';
        return;
    }
    
    // Create repository cards
    data.repositories.forEach(repo => {
        const repoCard = document.createElement('div');
        repoCard.className = 'repo-card';
        
        const repoName = document.createElement('h3');
        repoName.className = 'repo-name';
        const repoLink = document.createElement('a');
        repoLink.href = repo.url;
        repoLink.target = '_blank';
        repoLink.textContent = `📦 ${repo.name}`;
        repoName.appendChild(repoLink);
        
        const repoDesc = document.createElement('p');
        repoDesc.className = 'repo-description';
        repoDesc.textContent = repo.description || '📝 No description';
        
        const repoSize = document.createElement('p');
        repoSize.className = 'repo-size';
        repoSize.textContent = `💾 Size: ${repo.size_formatted}`;
        
        const repoMeta = document.createElement('div');
        repoMeta.className = 'repo-meta';
        repoMeta.innerHTML = `⭐ ${repo.stars} | 🍴 Forks: ${repo.forks}`;
        
        // Language breakdown
        const langDiv = document.createElement('div');
        langDiv.className = 'repo-languages';
        
        if (Object.keys(repo.languages).length > 0) {
            const langList = Object.entries(repo.languages)
                .sort((a, b) => b[1] - a[1])
                .map(([lang, pct]) => `${lang}: ${pct}%`)
                .join(' | ');
            langDiv.textContent = `💻 Languages: ${langList}`;
        }
        
        repoCard.appendChild(repoName);
        repoCard.appendChild(repoDesc);
        repoCard.appendChild(repoSize);
        repoCard.appendChild(repoMeta);
        if (langDiv.textContent) {
            repoCard.appendChild(langDiv);
        }
        
        repoList.appendChild(repoCard);
    });
}

// Generate individual repository tabs with detailed information
function generateIndividualRepoTabs(data) {
    const repoTabsContainer = document.getElementById('repo-tabs-container');
    const individualReposContainer = document.getElementById('individual-repos-container');
    
    if (!repoTabsContainer || !individualReposContainer) return;
    
    // Clear existing content
    repoTabsContainer.innerHTML = '';
    individualReposContainer.innerHTML = '';
    
    if (!data.repositories || data.repositories.length === 0) {
        return;
    }
    
    // Create separator
    const separator = document.createElement('div');
    separator.className = 'repo-tabs-separator';
    separator.textContent = '📚 Repositories';
    repoTabsContainer.appendChild(separator);
    
    // Generate tab buttons and content for each repository
    data.repositories.forEach((repo, index) => {
        const tabId = `repo-${repo.name.replace(/[^a-zA-Z0-9]/g, '-')}`;
        
        // Create tab button
        const tabButton = document.createElement('button');
        tabButton.className = 'button repo-button';
        tabButton.textContent = `📦 ${repo.name}`;
        tabButton.onclick = () => showTab(tabId);
        repoTabsContainer.appendChild(tabButton);
        
        // Create tab content
        const tabContent = document.createElement('div');
        tabContent.id = tabId;
        tabContent.className = 'tab-content hidden';
        
        // Repository details
        const repoTitle = document.createElement('h2');
        const repoLink = document.createElement('a');
        repoLink.href = repo.url;
        repoLink.target = '_blank';
        repoLink.textContent = `📦 ${repo.name}`;
        repoLink.style.color = 'rgba(100, 150, 255, 0.9)';
        repoLink.style.textDecoration = 'none';
        repoTitle.appendChild(repoLink);
        
        const repoDetails = document.createElement('div');
        repoDetails.className = 'repo-details-container';
        
        // Description
        const descSection = document.createElement('div');
        descSection.className = 'repo-detail-section';
        const descTitle = document.createElement('h3');
        descTitle.textContent = '📝 Description';
        const descText = document.createElement('p');
        descText.className = 'repo-detail-text';
        descText.textContent = repo.description || 'No description available';
        descSection.appendChild(descTitle);
        descSection.appendChild(descText);
        
        // Stats
        const statsSection = document.createElement('div');
        statsSection.className = 'repo-detail-section';
        const statsTitle = document.createElement('h3');
        statsTitle.textContent = '📊 Statistics';
        const statsContent = document.createElement('div');
        statsContent.className = 'repo-stats-grid';
        statsContent.innerHTML = `
            <div class="stat-item">
                <span class="stat-label">⭐ Stars:</span>
                <span class="stat-value">${repo.stars}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">🍴 Forks:</span>
                <span class="stat-value">${repo.forks}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">💾 Size:</span>
                <span class="stat-value">${repo.size_formatted}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">📅 Updated:</span>
                <span class="stat-value">${new Date(repo.updated_at).toLocaleDateString()}</span>
            </div>
        `;
        statsSection.appendChild(statsTitle);
        statsSection.appendChild(statsContent);
        
        // Languages
        if (Object.keys(repo.languages).length > 0) {
            const langSection = document.createElement('div');
            langSection.className = 'repo-detail-section';
            const langTitle = document.createElement('h3');
            langTitle.textContent = '💻 Languages';
            const langContent = document.createElement('div');
            langContent.className = 'repo-languages-detail';
            
            Object.entries(repo.languages)
                .sort((a, b) => b[1] - a[1])
                .forEach(([lang, pct]) => {
                    const langItem = document.createElement('div');
                    langItem.className = 'language-detail-item';
                    
                    const langInfo = document.createElement('div');
                    langInfo.className = 'language-detail-info';
                    langInfo.innerHTML = `
                        <span class="language-detail-name">${lang}</span>
                        <span class="language-detail-percentage">${pct}%</span>
                    `;
                    
                    const langBar = document.createElement('div');
                    langBar.className = 'language-detail-bar-container';
                    const langBarFill = document.createElement('div');
                    langBarFill.className = 'language-detail-bar';
                    langBarFill.style.width = `${pct}%`;
                    langBar.appendChild(langBarFill);
                    
                    langItem.appendChild(langInfo);
                    langItem.appendChild(langBar);
                    langContent.appendChild(langItem);
                });
            
            langSection.appendChild(langTitle);
            langSection.appendChild(langContent);
            repoDetails.appendChild(descSection);
            repoDetails.appendChild(statsSection);
            repoDetails.appendChild(langSection);
        } else {
            repoDetails.appendChild(descSection);
            repoDetails.appendChild(statsSection);
        }
        
        // README Section
        if (repo.readme) {
            const readmeSection = document.createElement('div');
            readmeSection.className = 'repo-detail-section';
            const readmeTitle = document.createElement('h3');
            readmeTitle.textContent = '📖 README';
            const readmeContent = document.createElement('div');
            readmeContent.className = 'repo-readme-content markdown-body';
            
            // Convert markdown to HTML using marked library
            if (typeof marked !== 'undefined') {
                try {
                    // Configure marked for GitHub-flavored markdown
                    marked.setOptions({
                        breaks: true,
                        gfm: true
                    });
                    readmeContent.innerHTML = marked.parse(repo.readme);
                } catch (error) {
                    console.error('Error parsing markdown:', error);
                    // Fallback to plain text if markdown parsing fails
                    const readmePre = document.createElement('pre');
                    readmePre.className = 'repo-readme-text';
                    readmePre.textContent = repo.readme;
                    readmeContent.appendChild(readmePre);
                }
            } else {
                // Fallback if marked library is not loaded
                const readmePre = document.createElement('pre');
                readmePre.className = 'repo-readme-text';
                readmePre.textContent = repo.readme;
                readmeContent.appendChild(readmePre);
            }
            
            readmeSection.appendChild(readmeTitle);
            readmeSection.appendChild(readmeContent);
            repoDetails.appendChild(readmeSection);
        }
        
        tabContent.appendChild(repoTitle);
        tabContent.appendChild(repoDetails);
        individualReposContainer.appendChild(tabContent);
    });
}
