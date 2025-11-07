modes = [0, 50];
mode = false;
var actual = null;
var currentTab = null;


function show(s) {
    mode = !mode;
    document.querySelector('#'+s).style.height = modes[Number(mode)] + "px";
}

function changeActual(s){
    show(actual);
    actual = s;
}

function showTab(tabId) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.classList.add('hidden');
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.remove('hidden');
        currentTab = tabId;
    }
}

async function loadRepoStats() {
    try {
        const response = await fetch('data/repo-stats.json');
        const data = await response.json();
        
        displayRepositories(data);
        displayLanguageStats(data);
    } catch (error) {
        console.error('Error loading repository statistics:', error);
    }
}

function displayRepositories(data) {
    const repoList = document.getElementById('repo-list');
    const lastUpdated = document.getElementById('last-updated');
    
    if (!repoList) return;
    
    // Display last updated time
    if (lastUpdated && data.last_updated) {
        const date = new Date(data.last_updated);
        lastUpdated.textContent = `Last updated: ${date.toLocaleString()}`;
    }
    
    // Clear existing content
    repoList.innerHTML = '';
    
    if (!data.repositories || data.repositories.length === 0) {
        repoList.innerHTML = '<p class="info-text">No repositories found. Statistics will be updated soon.</p>';
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
        repoLink.textContent = repo.name;
        repoName.appendChild(repoLink);
        
        const repoDesc = document.createElement('p');
        repoDesc.className = 'repo-description';
        repoDesc.textContent = repo.description || 'No description';
        
        const repoSize = document.createElement('p');
        repoSize.className = 'repo-size';
        repoSize.textContent = `Size: ${repo.size_formatted}`;
        
        const repoMeta = document.createElement('div');
        repoMeta.className = 'repo-meta';
        repoMeta.innerHTML = `★ ${repo.stars} | Forks: ${repo.forks}`;
        
        // Language breakdown
        const langDiv = document.createElement('div');
        langDiv.className = 'repo-languages';
        
        if (Object.keys(repo.languages).length > 0) {
            const langList = Object.entries(repo.languages)
                .sort((a, b) => b[1] - a[1])
                .map(([lang, pct]) => `${lang}: ${pct}%`)
                .join(' | ');
            langDiv.textContent = `Languages: ${langList}`;
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

function displayLanguageStats(data) {
    const languageStats = document.getElementById('language-stats');
    
    if (!languageStats) return;
    
    // Clear existing content
    languageStats.innerHTML = '';
    
    if (!data.overall_languages || Object.keys(data.overall_languages).length === 0) {
        languageStats.innerHTML = '<p class="info-text">No language statistics available yet.</p>';
        return;
    }
    
    // Create overall statistics summary
    const summary = document.createElement('div');
    summary.className = 'language-summary';
    summary.innerHTML = `<p class="info-text">Total repositories analyzed: ${data.total_repositories}</p>`;
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
            langName.textContent = language;
            
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

class Node{
    constructor (id){
        this.x = Math.round((Math.random()*10));
        this.y = Math.round((Math.random()*10));
        this.id = id;
        this.connections = [];
    }

}


function GenerateGraph(){
    var positions = new Set()
    var gradient = 20;
    var total = Math.round((Math.random()*gradient)),nodes = []
    if(total < 2)total = 2;
    for(var i = 0; i < total; i++){
        var le = [positions.size][0];
        var node = new Node(i);
        positions.add([node.x,node.y]);
        if(positions.size == le){
            i--;
            continue;
        }
        nodes.push(node);
    }
    for(var i = 0; i < total*2; i++){
        var a = Math.round((Math.random()*gradient))
        var b = Math.round((Math.random()*gradient))
        if(a >= total || b >= total || a == b){
            i--;
            continue;
        }
        nodes[a].connections.push(nodes[b].id);
    }
    return nodes;
}

console.log(GenerateGraph());