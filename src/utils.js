// Utility functions for the application

// Mode toggle state
let modes = [0, 50];
let mode = false;
let actual = null;

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

// Toggle visibility helper
function show(s) {
    mode = !mode;
    document.querySelector('#'+s).style.height = modes[Number(mode)] + "px";
}

// Change active element helper
function changeActual(s){
    show(actual);
    actual = s;
}
