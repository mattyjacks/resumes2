// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactions
    initializeScrollAnimations();
    initializeSkillBars();
    initializeNavbarEffects();
    initializeInteractiveElements();
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Navbar scroll effects
function initializeNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Change navbar style on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.96)';
            navbar.style.boxShadow = '0 6px 18px rgba(0,0,0,0.06)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.92)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Click handlers for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Scroll animations for elements
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Special animation for skill bars
                if (entry.target.classList.contains('tech-skills')) {
                    animateSkillBars();
                }
                // Subtle reveal on sections with cards
                if (entry.target.classList.contains('about-grid')) {
                    animateCards(entry.target, '.about-card', 120);
                }
                if (entry.target.classList.contains('timeline')) {
                    animateCards(entry.target, '.timeline-card', 150);
                }
                if (entry.target.classList.contains('cert-grid')) {
                    animateCards(entry.target, '.cert-item', 120);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll(
        '.about-grid, .timeline, .tech-skills, .cert-grid, .contact-info, .references'
    );
    
    animatedElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

// Animate cards with stagger effect
function animateCards(container, cardSelector, delay = 150) {
    const cards = container.querySelectorAll(cardSelector);
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = `slideUpFade 0.6s ease-out forwards`;
        }, index * delay);
    });
}

// Initialize skill bar animations
function initializeSkillBars() {
    // Add CSS for slideUpFade animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUpFade {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes skillBarFill {
            from {
                width: 0;
            }
            to {
                width: var(--target-width);
            }
        }
        
        .nav-link.active {
            color: var(--ph-red) !important;
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);
}

// Animate skill bars when they come into view
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        const targetWidth = bar.getAttribute('data-width');
        
        setTimeout(() => {
            bar.style.setProperty('--target-width', targetWidth);
            bar.style.animation = `skillBarFill 2s ease-out forwards`;
            bar.style.width = targetWidth;
        }, index * 200);
    });
}

// Interactive elements and hover effects
function initializeInteractiveElements() {
    // Copy contact info on click
    const contactDetails = document.querySelectorAll('.contact-details p');
    contactDetails.forEach(detail => {
        if (detail.textContent.includes('@') || detail.textContent.includes('+63')) {
            detail.style.cursor = 'pointer';
            detail.title = 'Click to copy';
            
            detail.addEventListener('click', function() {
                navigator.clipboard.writeText(this.textContent).then(() => {
                    // Show copied feedback
                    const originalText = this.textContent;
                    this.textContent = 'Copied!';
                    this.style.color = '#28a745';
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.color = '';
                    }, 2000);
                });
            });
        }
    });
    
    // Subtle Philippines flag hover
    const flags = document.querySelectorAll('.philippines-flag');
    flags.forEach(flag => {
        let hoverTimeout;
        
        flag.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimeout);
            this.style.transform = 'scale(1.05)';
        });
        
        flag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            hoverTimeout = setTimeout(() => {
                // restore any default animations if defined in CSS
                this.style.animation = '';
            }, 300);
        });
    });
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(function() {
    // Any scroll-based animations can be placed here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Intersection Observer for better performance
const createObserver = (callback, options = {}) => {
    const defaultOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    return new IntersectionObserver(callback, { ...defaultOptions, ...options });
};

// Initialize everything when the page loads
window.addEventListener('load', function() {
    // Add a subtle entrance animation to the whole page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Initialize any additional effects
    console.log('🇵🇭 Christian\'s resume website loaded successfully!');
});
