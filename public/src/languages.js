// Language statistics display functionality

// Display overall language statistics across all repositories
function displayLanguageStats(data) {
    const languageStats = document.getElementById('language-stats');
    
    if (!languageStats) return;
    
    // Clear existing content
    languageStats.innerHTML = '';
    
    if (!data.overall_languages || Object.keys(data.overall_languages).length === 0) {
        languageStats.innerHTML = '<p class="info-text">📊 No language statistics available yet.</p>';
        return;
    }
    
    // Create overall statistics summary
    const summary = document.createElement('div');
    summary.className = 'language-summary';
    summary.innerHTML = `<p class="info-text">📚 Total repositories analyzed: ${data.total_repositories}</p>`;
    languageStats.appendChild(summary);
    
    // Create language bars
    const langContainer = document.createElement('div');
    langContainer.className = 'language-bars';
    
    Object.entries(data.overall_languages)
        .sort((a, b) => b[1] - a[1])
        .forEach(([language, percentage]) => {
            const langItem = document.createElement('div');
            langItem.className = 'language-item';
            
            const langName = document.createElement('div');
            langName.className = 'language-name';
            langName.textContent = `💻 ${language}`;
            
            const langBarContainer = document.createElement('div');
            langBarContainer.className = 'language-bar-container';
            
            const langBar = document.createElement('div');
            langBar.className = 'language-bar';
            langBar.style.width = `${percentage}%`;
            
            const langPercentage = document.createElement('div');
            langPercentage.className = 'language-percentage';
            langPercentage.textContent = `${percentage}%`;
            
            langBarContainer.appendChild(langBar);
            langItem.appendChild(langName);
            langItem.appendChild(langBarContainer);
            langItem.appendChild(langPercentage);
            
            langContainer.appendChild(langItem);
        });
    
    languageStats.appendChild(langContainer);
}
