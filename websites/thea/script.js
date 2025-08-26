// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-link');

    function highlightNavigation() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.timeline-item, .education-card, .skill-card, .language-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Typing animation for the name
    const nameTitle = document.querySelector('.name-title');
    const originalText = nameTitle.textContent;
    nameTitle.textContent = '';
    
    function typeWriter(text, element, speed = 100) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Start typing animation after a short delay
    setTimeout(() => {
        typeWriter(originalText, nameTitle, 80);
    }, 1000);

    // Removed parallax scroll to prevent animation glitches on some devices

    // Interactive skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotate(2deg) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg) scale(1)';
        });
    });

    // Animated fill for proficiency bars (skills and languages)
    function animateBarsIn(container) {
        const bars = container.querySelectorAll('.proficiency-fill');
        bars.forEach(bar => {
            const target = bar.getAttribute('style')?.match(/width:\s*([0-9.]+%)/);
            const targetWidth = target ? target[1] : '100%';
            bar.style.width = '0%';
            requestAnimationFrame(() => {
                bar.style.transition = 'width 2s ease-out';
                bar.style.width = targetWidth;
            });
        });
    }

    const barSections = document.querySelectorAll('.languages-section, .expertise-section');
    const barsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateBarsIn(entry.target);
                barsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    barSections.forEach(sec => barsObserver.observe(sec));

    // Add sparkle effect on hover for contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            createSparkle(this);
        });
    });

    function createSparkle(element) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: #fcd116;
            border-radius: 50%;
            pointer-events: none;
            animation: sparkleAnim 1s ease-out forwards;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
        `;
        
        element.style.position = 'relative';
        element.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }

    // Add sparkle animation to CSS
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        @keyframes sparkleAnim {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(1) rotate(180deg);
                opacity: 1;
            }
            100% {
                transform: scale(0) rotate(360deg);
                opacity: 0;
            }
        }
        
        .nav-link.active {
            color: #ED3500 !important;
            font-weight: 600;
        }
        
        .nav-link.active::after {
            width: 80% !important;
        }
    `;
    document.head.appendChild(sparkleStyle);

    // Keep timeline markers static (no animation)

    // Removed background flicker on scroll to ensure stable visuals

    // Add click effect to timeline items
    const timelineItems = document.querySelectorAll('.timeline-content');
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Preload animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

// Add loaded class styles
const loadedStyle = document.createElement('style');
loadedStyle.textContent = `
    body:not(.loaded) * {
        animation-play-state: paused !important;
    }
    
    .loaded * {
        animation-play-state: running !important;
    }
`;
document.head.appendChild(loadedStyle);
