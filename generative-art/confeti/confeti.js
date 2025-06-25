/**
 * Confetti Animation
 * Generates a dynamic confetti-like animation using particle systems.
 */

// Animation parameters
let params = {
    frameRate: 2,
    circleSize: 125,
    dotSize: 16,
    randomCenter: true,
    chaoticMode: false
};

// Preset configurations
const presets = [
    {
        name: "Classic",
        frameRate: 20,
        circleSize: 125,
        dotSize: 16,
        randomCenter: true,
        chaoticMode: true
    },
    {
        name: "Slow Bloom",
        frameRate: 1,
        circleSize: 200,
        dotSize: 18,
        randomCenter: false,
        chaoticMode: false
    },
    {
        name: "Random circles",
        frameRate: 5,
        circleSize: 125,
        dotSize: 16,
        randomCenter: true,
        chaoticMode: false
    },
    {
        name: "Tiny Burst",
        frameRate: 20,
        circleSize: 50,
        dotSize: 4,
        randomCenter: true,
        chaoticMode: false
    },
    {
        name: "Giant Swirl",
        frameRate: 3,
        circleSize: 300,
        dotSize: 30,
        randomCenter: false,
        chaoticMode: true
    }
];

let currentPresetIndex = 0;
let dots;

function setup() {
    createCanvas(500, 500);
    background(0);
    dots = new Dots();
    applyPreset(presets[currentPresetIndex]);
}

function draw() {
    background(0, 0); // TODO: Play with transparency
    dots.show();
    frameRate(params.frameRate);
}

function mousePressed() {
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        isLooping() ? noLoop() : loop();
    }
}

// Preset navigation functions
function nextPreset() {
    currentPresetIndex = (currentPresetIndex + 1) % presets.length;
    applyPreset(presets[currentPresetIndex]);
}

function previousPreset() {
    currentPresetIndex = (currentPresetIndex - 1 + presets.length) % presets.length;
    applyPreset(presets[currentPresetIndex]);
}

function applyPreset(preset) {
    params = { ...preset };
    dots.updateParams(params);
    background(0);
    updateUI();
}

function updateUI() {
    document.getElementById('presetName').textContent = presets[currentPresetIndex].name;
}

