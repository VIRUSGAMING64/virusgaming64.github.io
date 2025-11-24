// Main application initialization and data loading
// NOTE: This file is legacy code and not currently used.
// The active application uses React in App.jsx which imports data directly.

// Load repository statistics from JSON file
// DEPRECATED: Use direct import instead of fetch
// import repoStatsData from '../data/repo-stats.json';
async function loadRepoStats() {
    try {
        // To avoid fetch in GitHub Pages, import the JSON directly in your component:
        // import repoStatsData from '../data/repo-stats.json';
        // const data = repoStatsData;
        
        console.warn('This function is deprecated. Use direct JSON import instead of fetch.');
        
        // Legacy code removed - see App.jsx for current implementation
        // displayRepositories(data);
        // displayLanguageStats(data);
        // generateIndividualRepoTabs(data);
        
        // Open languages tab by default
        // showTab('languages-tab');
    } catch (error) {
        console.error('Error loading repository statistics:', error);
    }
}
