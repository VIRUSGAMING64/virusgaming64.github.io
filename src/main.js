modes = [0, 50];
mode = false;
var actual = null;
var currentTab = null;
var edgesGlowing = false;
var glowIntensity = 0;
var glowStartTime = 0;
var isGlowingPhase = false;

// Generate random gradient colors - Warp-style dark theme
function generateRandomGradient() {
    const randomColor = () => {
        const r = Math.floor(Math.random() * 20 + 10); // 10-30
        const g = Math.floor(Math.random() * 20 + 10); // 10-30
        const b = Math.floor(Math.random() * 25 + 15); // 15-40
        return `rgb(${r}, ${g}, ${b})`;
    };
    
    const color1 = randomColor();
    const color2 = randomColor();
    const color3 = randomColor();
    const angle = Math.floor(Math.random() * 360);
    
    return `linear-gradient(${angle}deg, ${color1} 0%, ${color2} 50%, ${color3} 100%)`;
}

// Apply random gradient to body
function applyRandomGradient() {
    const gradient = generateRandomGradient();
    document.body.style.background = gradient;
}


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
        generateIndividualRepoTabs(data);
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


class Node{
    constructor (id, canvasWidth, canvasHeight){
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.id = id;
        this.connections = [];
        this.radius = 3;
    }

    update(canvasWidth, canvasHeight) {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvasWidth) this.vx *= -1;
        if (this.y < 0 || this.y > canvasHeight) this.vy *= -1;
        
        this.x = Math.max(0, Math.min(canvasWidth, this.x));
        this.y = Math.max(0, Math.min(canvasHeight, this.y));
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(200, 200, 255, 0.95)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(230, 230, 255, 0.85)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}


function GenerateGraph(canvasWidth, canvasHeight){
    var total = Math.floor(20 + Math.random() * 15);
    var nodes = [];
    
    for(var i = 0; i < total; i++){
        var node = new Node(i, canvasWidth, canvasHeight);
        nodes.push(node);
    }
    
    for(var i = 0; i < total * 1.5; i++){
        var a = Math.floor(Math.random() * total);
        var b = Math.floor(Math.random() * total);
        if(a !== b && !nodes[a].connections.includes(b)){
            nodes[a].connections.push(b);
        }
    }
    return nodes;
}

var graphCanvas, graphCtx, graphNodes;
var edgesToRemove = [];

function initGraph() {
    graphCanvas = document.getElementById('graph-canvas');
    if (!graphCanvas) return;
    
    graphCtx = graphCanvas.getContext('2d');
    resizeCanvas();
    
    graphNodes = GenerateGraph(graphCanvas.width, graphCanvas.height);
    
    window.addEventListener('resize', resizeCanvas);
    
    // Apply random gradient on page load
    applyRandomGradient();
    
    animateGraph();
    
    // Remove edges periodically
    setInterval(removeRandomEdges, 2000);
    
    // Make edges glow every 20 seconds
    setInterval(() => {
        startGlowCycle();
    }, 20000);
}

function resizeCanvas() {
    if (!graphCanvas) return;
    graphCanvas.width = window.innerWidth;
    graphCanvas.height = window.innerHeight;
}

function removeRandomEdges() {
    if (!graphNodes || graphNodes.length === 0) return;
    
    // Find all edges
    let allEdges = [];
    graphNodes.forEach(node => {
        node.connections.forEach(targetId => {
            allEdges.push({ from: node.id, to: targetId });
        });
    });
    
    if (allEdges.length === 0) return;
    
    // Remove 1-3 random edges
    const numToRemove = Math.min(1 + Math.floor(Math.random() * 3), allEdges.length);
    for (let i = 0; i < numToRemove; i++) {
        const edgeIndex = Math.floor(Math.random() * allEdges.length);
        const edge = allEdges[edgeIndex];
        
        const node = graphNodes[edge.from];
        const connIndex = node.connections.indexOf(edge.to);
        if (connIndex > -1) {
            node.connections.splice(connIndex, 1);
            edgesToRemove.push({ edge, timestamp: Date.now() });
        }
        
        allEdges.splice(edgeIndex, 1);
    }
    
    // Add new edges to maintain connectivity
    setTimeout(() => {
        for (let i = 0; i < numToRemove; i++) {
            const a = Math.floor(Math.random() * graphNodes.length);
            const b = Math.floor(Math.random() * graphNodes.length);
            if (a !== b && !graphNodes[a].connections.includes(b)) {
                graphNodes[a].connections.push(b);
            }
        }
    }, 1000);
}

function startGlowCycle() {
    isGlowingPhase = true;
    glowStartTime = Date.now();
}

function updateGlowIntensity() {
    if (!isGlowingPhase) {
        glowIntensity = 0;
        return;
    }
    
    const elapsed = Date.now() - glowStartTime;
    const fadeInDuration = 1000; // 1 second fade in
    const stayDuration = 3000; // Stay lit for 3 seconds
    const delayDuration = 1000; // 1 second delay before turning off
    const fadeOutDuration = 500; // 0.5 second fade out
    
    if (elapsed < fadeInDuration) {
        // Gradual fade in
        glowIntensity = elapsed / fadeInDuration;
    } else if (elapsed < fadeInDuration + stayDuration) {
        // Stay fully lit
        glowIntensity = 1.0;
    } else if (elapsed < fadeInDuration + stayDuration + delayDuration) {
        // Delay before turning off (stay at full intensity)
        glowIntensity = 1.0;
    } else if (elapsed < fadeInDuration + stayDuration + delayDuration + fadeOutDuration) {
        // Fade out
        const fadeOutElapsed = elapsed - (fadeInDuration + stayDuration + delayDuration);
        glowIntensity = 1.0 - (fadeOutElapsed / fadeOutDuration);
    } else {
        // Completely off
        glowIntensity = 0;
        isGlowingPhase = false;
    }
}

function animateGraph() {
    if (!graphCanvas || !graphCtx || !graphNodes) return;
    
    // Update glow intensity
    updateGlowIntensity();
    
    graphCtx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);
    
    // Update and draw edges with gradual glow effect
    graphNodes.forEach(node => {
        node.connections.forEach(targetId => {
            const target = graphNodes[targetId];
            if (target) {
                graphCtx.beginPath();
                graphCtx.moveTo(node.x, node.y);
                graphCtx.lineTo(target.x, target.y);
                
                if (glowIntensity > 0) {
                    // Glowing edges with gradual intensity
                    const alpha = 0.3 + (0.6 * glowIntensity);
                    graphCtx.strokeStyle = `rgba(200, 200, 255, ${alpha})`;
                    graphCtx.lineWidth = 1 + (glowIntensity * 1.5);
                    graphCtx.shadowBlur = glowIntensity * 15;
                    graphCtx.shadowColor = `rgba(150, 150, 255, ${glowIntensity * 0.8})`;
                } else {
                    // Normal edges
                    graphCtx.strokeStyle = 'rgba(100, 100, 200, 0.3)';
                    graphCtx.lineWidth = 1;
                    graphCtx.shadowBlur = 0;
                }
                
                graphCtx.stroke();
            }
        });
    });
    
    // Reset shadow for nodes
    graphCtx.shadowBlur = 0;
    
    // Update and draw nodes
    graphNodes.forEach(node => {
        node.update(graphCanvas.width, graphCanvas.height);
        node.draw(graphCtx);
    });
    
    requestAnimationFrame(animateGraph);
}

console.log("Graph system initialized");