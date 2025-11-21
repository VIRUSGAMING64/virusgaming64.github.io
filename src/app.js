// Main application initialization and data loading

// Load repository statistics from JSON file
async function loadRepoStats() {
    try {
        const response = await fetch('data/repo-stats.json');
        const data = await response.json();
        
        displayRepositories(data);
        displayLanguageStats(data);
        generateIndividualRepoTabs(data);
    } catch (error) {
        console.error('Error loading repository statistics:', error);
    }
}
