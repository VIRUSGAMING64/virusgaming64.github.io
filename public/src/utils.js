// Utility functions for the application

// Mode toggle state
let modes = [0, 50];
let mode = false;
let actual = null;

// Generate random gradient colors - dark theme matching React version
function generateRandomGradient() {
    const gradients = [
      'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
      'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      'linear-gradient(135deg, #141e30 0%, #243b55 100%)',
      'linear-gradient(135deg, #000000 0%, #0f2027 50%, #203a43 100%)',
      'linear-gradient(135deg, #0c0c0c 0%, #1c1c3c 100%)',
      'linear-gradient(135deg, #1a1a1a 0%, #2d2d44 100%)',
      'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2128 100%)',
      'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
      'linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%)',
      'linear-gradient(135deg, #0c0c1e 0%, #1e1e3f 100%)',
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
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
