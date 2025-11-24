// Main application initialization and data loading

// Load repository statistics from JSON file
async function loadRepoStats() {
    try {
        // Fetch the JSON data
        const response = await fetch('/data/repo-stats.json');
        const data = await response.json();
        
        // Display the data using module functions
        displayRepositories(data);
        displayLanguageStats(data);
        generateIndividualRepoTabs(data);
        
        // Open languages tab by default
        showTab('languages-tab');
    } catch (error) {
        console.error('Error loading repository statistics:', error);
        
        // Show error message to user
        const repoList = document.getElementById('repo-list');
        const languageStats = document.getElementById('language-stats');
        
        if (repoList) {
            repoList.innerHTML = '<p class="info-text">⚠️ Error loading repository data. Please try again later.</p>';
        }
        if (languageStats) {
            languageStats.innerHTML = '<p class="info-text">⚠️ Error loading language statistics.</p>';
        }
    }
}
