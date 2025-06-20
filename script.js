// Global variables
let continuousAnimationRunning = true;

// DOM Elements
const morphingShape = document.getElementById('morphing-shape');
const revealBox = document.getElementById('reveal-box');
const continuousShape = document.getElementById('continuous-shape');
const continuousBtn = document.getElementById('continuous-btn');
const loadingBar = document.getElementById('loading-bar');
const loadingCircle = document.getElementById('loading-circle');
const textReveal = document.getElementById('text-reveal');

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
});