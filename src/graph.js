// Graph visualization with animated nodes and connections

// Node class for graph visualization
class Node {
    constructor(id, canvasWidth, canvasHeight) {
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

// Generate a random graph with nodes and connections
function GenerateGraph(canvasWidth, canvasHeight) {
    var total = Math.floor(20 + Math.random() * 15);
    var nodes = [];
    
    for (var i = 0; i < total; i++) {
        var node = new Node(i, canvasWidth, canvasHeight);
        nodes.push(node);
    }
    
    for (var i = 0; i < total * 1.5; i++) {
        var a = Math.floor(Math.random() * total);
        var b = Math.floor(Math.random() * total);
        if (a !== b && !nodes[a].connections.includes(b)) {
            nodes[a].connections.push(b);
        }
    }
    return nodes;
}

// Graph state variables
var graphCanvas, graphCtx, graphNodes;
var edgesToRemove = [];
var edgesGlowing = false;
var glowIntensity = 0;
var glowStartTime = 0;
var isGlowingPhase = false;

// Initialize the graph visualization
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

// Resize canvas to match window size
function resizeCanvas() {
    if (!graphCanvas) return;
    graphCanvas.width = window.innerWidth;
    graphCanvas.height = window.innerHeight;
}

// Remove random edges from the graph
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

// Start the glow cycle for edges
function startGlowCycle() {
    isGlowingPhase = true;
    glowStartTime = Date.now();
}

// Update the glow intensity based on time
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

// Animate the graph visualization
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
