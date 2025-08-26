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
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
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
                
                // Special animation for cards
                if (entry.target.classList.contains('about-grid')) {
                    animateCards(entry.target, '.about-card');
                }
                
                if (entry.target.classList.contains('timeline')) {
                    animateCards(entry.target, '.timeline-card', 200);
                }
                
                if (entry.target.classList.contains('cert-grid')) {
                    animateCards(entry.target, '.cert-item', 100);
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
        
        .floating-element {
            animation: floatUpDown 3s ease-in-out infinite;
        }
        
        @keyframes floatUpDown {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-10px);
            }
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
    // Add floating animation to profile card
    const profileCard = document.querySelector('.profile-card');
    if (profileCard) {
        profileCard.classList.add('floating-element');
    }
    
    // Interactive button effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('click', function(e) {
            // Ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Card hover effects with enhanced animations
    const cards = document.querySelectorAll('.about-card, .timeline-card, .contact-card, .cert-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });
    });
    
    // Skill item hover effects
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(15px) scale(1.02)';
            this.style.backgroundColor = '#f8f9ff';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.backgroundColor = 'white';
        });
    });
    
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
    
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
    
    // Enhanced Philippines flag animation
    const flags = document.querySelectorAll('.philippines-flag');
    flags.forEach(flag => {
        let hoverTimeout;
        
        flag.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimeout);
            this.style.animation = 'none';
            this.style.transform = 'scale(1.2) rotate(10deg)';
        });
        
        flag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            hoverTimeout = setTimeout(() => {
                this.style.animation = 'wave 2s ease-in-out infinite';
            }, 300);
        });
    });
}

// Add ripple effect CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(rippleStyle);

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
