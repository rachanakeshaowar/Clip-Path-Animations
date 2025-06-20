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

// Initialize all animations
function initializeAnimations() {
    // Morphing shape click event
    if (morphingShape) {
        morphingShape.addEventListener('click', function() {
            this.classList.remove('animate');
            // Force reflow
            void this.offsetWidth;
            this.classList.add('animate');
            
            // Remove class after animation completes
            setTimeout(() => {
                this.classList.remove('animate');
            }, 4000);
        });
    }
    // Add floating animation to all cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'float 3s ease-in-out infinite';
            }
        });
    }, observerOptions);

    // Observe all animation cards
    document.querySelectorAll('.animation-card').forEach(card => {
        observer.observe(card);
    });

    // Add hover effects to shapes
    addHoverEffects();
    
    // Add particle effects
    createParticleBackground();
}

// Reveal animation functions
function triggerReveal(type) {
    if (!revealBox) return;
    
    // Remove any existing animation classes
    revealBox.className = 'reveal-box';
    
    // Force reflow
    void revealBox.offsetWidth;
    
    // Add the appropriate animation class
    switch(type) {
        case 'left':
            revealBox.classList.add('reveal-left');
            break;
        case 'right':
            revealBox.classList.add('reveal-right');
            break;
        case 'circle':
            revealBox.classList.add('reveal-circle');
            break;
        case 'diamond':
            revealBox.classList.add('reveal-diamond');
            break;
    }
    
    // Remove animation class after completion
    setTimeout(() => {
        revealBox.className = 'reveal-box';
    }, 1500);
}
// Toggle continuous animation
function toggleContinuous() {
    if (!continuousShape || !continuousBtn) return;
    
    continuousAnimationRunning = !continuousAnimationRunning;
    
    if (continuousAnimationRunning) {
        continuousShape.classList.remove('paused');
        continuousBtn.textContent = 'Pause';
    } else {
        continuousShape.classList.add('paused');
        continuousBtn.textContent = 'Play';
    }
}


  }