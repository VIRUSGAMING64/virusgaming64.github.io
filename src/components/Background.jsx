import { useEffect, useRef } from 'react';

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

function generateGraph(canvasWidth, canvasHeight) {
  const total = Math.floor(20 + Math.random() * 15);
  const nodes = [];
  
  for (let i = 0; i < total; i++) {
    const node = new Node(i, canvasWidth, canvasHeight);
    nodes.push(node);
  }
  
  for (let i = 0; i < total * 1.5; i++) {
    const a = Math.floor(Math.random() * total);
    const b = Math.floor(Math.random() * total);
    if (a !== b && !nodes[a].connections.includes(b)) {
      nodes[a].connections.push(b);
    }
  }
  return nodes;
}

const Background = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let nodes = [];
    let animationFrameId;
    let glowIntensity = 0;
    let glowStartTime = 0;
    let isGlowingPhase = false;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      nodes = generateGraph(canvas.width, canvas.height);
    };

    const removeRandomEdges = () => {
      if (!nodes || nodes.length === 0) return;
      
      let allEdges = [];
      nodes.forEach(node => {
        node.connections.forEach(targetId => {
          allEdges.push({ from: node.id, to: targetId });
        });
      });
      
      if (allEdges.length === 0) return;
      
      const numToRemove = Math.min(1 + Math.floor(Math.random() * 3), allEdges.length);
      for (let i = 0; i < numToRemove; i++) {
        const edgeIndex = Math.floor(Math.random() * allEdges.length);
        const edge = allEdges[edgeIndex];
        
        const node = nodes[edge.from];
        const connIndex = node.connections.indexOf(edge.to);
        if (connIndex > -1) {
          node.connections.splice(connIndex, 1);
        }
        
        allEdges.splice(edgeIndex, 1);
      }
      
      setTimeout(() => {
        for (let i = 0; i < numToRemove; i++) {
          const a = Math.floor(Math.random() * nodes.length);
          const b = Math.floor(Math.random() * nodes.length);
          if (a !== b && !nodes[a].connections.includes(b)) {
            nodes[a].connections.push(b);
          }
        }
      }, 1000);
    };

    const startGlowCycle = () => {
      isGlowingPhase = true;
      glowStartTime = Date.now();
    };

    const updateGlowIntensity = () => {
      if (!isGlowingPhase) {
        glowIntensity = 0;
        return;
      }
      
      const elapsed = Date.now() - glowStartTime;
      const fadeInDuration = 1000;
      const stayDuration = 3000;
      const delayDuration = 1000;
      const fadeOutDuration = 500;
      
      if (elapsed < fadeInDuration) {
        glowIntensity = elapsed / fadeInDuration;
      } else if (elapsed < fadeInDuration + stayDuration) {
        glowIntensity = 1.0;
      } else if (elapsed < fadeInDuration + stayDuration + delayDuration) {
        glowIntensity = 1.0;
      } else if (elapsed < fadeInDuration + stayDuration + delayDuration + fadeOutDuration) {
        const fadeOutElapsed = elapsed - (fadeInDuration + stayDuration + delayDuration);
        glowIntensity = 1.0 - (fadeOutElapsed / fadeOutDuration);
      } else {
        glowIntensity = 0;
        isGlowingPhase = false;
      }
    };

    const animate = () => {
      updateGlowIntensity();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      nodes.forEach(node => {
        node.connections.forEach(targetId => {
          const target = nodes[targetId];
          if (target) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(target.x, target.y);
            
            if (glowIntensity > 0) {
              const alpha = 0.3 + (0.6 * glowIntensity);
              ctx.strokeStyle = `rgba(200, 200, 255, ${alpha})`;
              ctx.lineWidth = 1 + (glowIntensity * 1.5);
              ctx.shadowBlur = glowIntensity * 15;
              ctx.shadowColor = `rgba(150, 150, 255, ${glowIntensity * 0.8})`;
            } else {
              ctx.strokeStyle = 'rgba(100, 100, 200, 0.3)';
              ctx.lineWidth = 1;
              ctx.shadowBlur = 0;
            }
            
            ctx.stroke();
          }
        });
      });
      
      ctx.shadowBlur = 0;
      
      nodes.forEach(node => {
        node.update(canvas.width, canvas.height);
        node.draw(ctx);
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const edgeInterval = setInterval(removeRandomEdges, 2000);
    const glowInterval = setInterval(startGlowCycle, 20000);
    
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(edgeInterval);
      clearInterval(glowInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full opacity-20 -z-10"
    />
  );
};

export default Background;
