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
function triggerLoading() {
    if (loadingBar) {
        loadingBar.classList.remove('animate');
        void loadingBar.offsetWidth;
        loadingBar.classList.add('animate');
        
        setTimeout(() => {
            loadingBar.classList.remove('animate');
        }, 2000);
    }
    
    if (loadingCircle) {
        loadingCircle.classList.remove('animate');
        void loadingCircle.offsetWidth;
        loadingCircle.classList.add('animate');
        
        setTimeout(() => {
            loadingCircle.classList.remove('animate');
        }, 1500);
    }
}
// Trigger text reveal animation
function triggerTextReveal() {
    if (!textReveal) return;
    
    textReveal.classList.remove('animate');
    void textReveal.offsetWidth;
    textReveal.classList.add('animate');
    
    setTimeout(() => {
        textReveal.classList.remove('animate');
    }, 2000);
}
// Add enhanced hover effects
function addHoverEffects() {
    const hoverShapes = document.querySelectorAll('.hover-shape');
    
    hoverShapes.forEach(shape => {
        shape.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.2) saturate(1.3)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
        });
        
        shape.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1) saturate(1)';
            this.style.boxShadow = 'none';
        });
    });
}
// Create animated background particles
function createParticleBackground() {
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particleContainer);
    
    // Create floating particles
    for (let i = 0; i < 20; i++) {
        createParticle(particleContainer);
    }
}
function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 6 + 2;
    const startX = Math.random() * window.innerWidth;
    const duration = Math.random() * 20 + 10;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 100%);
        border-radius: 50%;
        top: 100vh;
        left: ${startX}px;
        animation: floatUp ${duration}s linear infinite;
        clip-path: circle(50% at 50% 50%);
    `;
    
    container.appendChild(particle);
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
            // Create a new particle to maintain count
            setTimeout(() => createParticle(container), Math.random() * 2000);
        }
    }, duration * 1000);
}
// Add floating particle animation
const floatUpKeyframes = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
  }