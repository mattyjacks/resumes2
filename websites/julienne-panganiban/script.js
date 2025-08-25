// Julienne Panganiban Resume - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Warm & Neutral palette for dynamic effects
    const flagColors = {
        blue: '#b4413e',   // deep warm red (repurposing key) 
        red: '#e1645e',    // coral red
        yellow: '#d9c0a3', // sand tan
        white: '#f3e7d8'   // soft beige
    };

    // Respect user motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize animations and interactions
    // initScrollAnimations removed to eliminate pop-in effects
    initSkillTagAnimations();
    initContactAnimations();
    // initLoadingAnimations removed to prevent load pop-ins
    initProgressBars();
    initConfetti();
    initFestiveTitleEffects();
    // Removed name glow for header stability

    // Scroll-triggered animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Add staggered animation for child elements
                    const children = entry.target.querySelectorAll('.experience-item, .skill-tag, .education-item, .language-item, .reference-item');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.style.animation = `slideInLeft 0.6s ease-out ${index * 0.1}s both`;
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Disabled: no scroll-triggered animations
    }

    // Skill tag interactions
    function initSkillTagAnimations() {
        const skillTags = document.querySelectorAll('.skill-tag');
        
        skillTags.forEach(tag => {
            // Keep CSS-driven hover only; add subtle click pulse + optional confetti
            tag.addEventListener('click', function() {
                this.style.animation = 'pulse 0.6s ease-out';
                setTimeout(() => { this.style.animation = ''; }, 600);

                if (!prefersReducedMotion) {
                    const rect = this.getBoundingClientRect();
                    burstConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 80);
                }
            });
        });
    }

    // Contact item animations
    function initContactAnimations() {
        const contactItems = document.querySelectorAll('.contact-item');
        
        contactItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(5deg)';
                    icon.style.color = flagColors.yellow;
                }
                this.style.transform = 'translateX(5px)';
            });
            
            item.addEventListener('mouseleave', function() {
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                    icon.style.color = flagColors.yellow;
                }
                this.style.transform = 'translateX(0)';
            });
        });
    }

    // Loading animations
    // initLoadingAnimations removed

    // Experience item hover effects handled purely by CSS for subtlety

    // Reference item hover effects handled by CSS only

    // Language proficiency animations
    const proficiencyBadges = document.querySelectorAll('.proficiency');
    proficiencyBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            if (this.classList.contains('fluent')) {
                this.style.background = flagColors.red;
                this.style.transform = 'scale(1.1)';
            } else {
                this.style.background = flagColors.blue;
                this.style.color = flagColors.white;
                this.style.transform = 'scale(1.1)';
            }
        });
        
        badge.addEventListener('mouseleave', function() {
            if (this.classList.contains('fluent')) {
                this.style.background = flagColors.blue;
                this.style.transform = 'scale(1)';
            } else {
                this.style.background = flagColors.yellow;
                this.style.color = '#2c3e50';
                this.style.transform = 'scale(1)';
            }
        });
    });

    // Add typing effect to profile description
    function initTypingEffect() {
        const profileText = document.querySelector('.profile-detail p');
        if (profileText) {
            const text = profileText.textContent;
            if (prefersReducedMotion) {
                // Show full text without typing animation
                profileText.textContent = text;
                profileText.style.borderRight = 'none';
                return;
            }

            profileText.textContent = '';
            profileText.style.borderRight = '2px solid ' + flagColors.blue;

            let index = 0;
            const timer = setInterval(() => {
                profileText.textContent += text.charAt(index);
                index++;

                if (index >= text.length) {
                    clearInterval(timer);
                    setTimeout(() => {
                        profileText.style.borderRight = 'none';
                    }, 500);
                }
            }, 50);
        }
    }

    // Initialize typing effect when profile section becomes visible
    const profileSection = document.querySelector('.profile-detail');
    if (profileSection) {
        const profileObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(initTypingEffect, 500);
                    profileObserver.unobserve(entry.target);
                }
            });
        });
        profileObserver.observe(profileSection);
    }

    // Smooth scrolling for any anchor links (respect reduced motion)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const behavior = prefersReducedMotion ? 'auto' : 'smooth';
                target.scrollIntoView({ behavior, block: 'start' });
            }
        });
    });

    // Floating profile image animation removed for header stability

    // Optional: soften achievement pulse respecting reduced motion
    const achievement = document.querySelector('.achievement');
    if (achievement && !prefersReducedMotion) {
        setInterval(() => {
            achievement.style.animation = 'pulse 1.5s ease-in-out';
            setTimeout(() => {
                achievement.style.animation = '';
            }, 1500);
        }, 8000);
    }

    // Confetti and progress bars and festive functions
    let confettiCanvas, ctx, confettiParticles = [], confettiRAF;

    // Initialize animated skill progress bars
    function initProgressBars() {
        const bars = document.querySelectorAll('.bar');
        if (!bars.length) return;

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const bar = entry.target;
                const fill = bar.querySelector('.bar-fill');
                const percentLabel = bar.querySelector('.bar-percent');
                const target = parseInt(fill.getAttribute('data-percent'), 10) || 0;

                if (prefersReducedMotion) {
                    fill.style.transition = 'none';
                    fill.style.width = target + '%';
                    percentLabel.textContent = target + '%';
                    obs.unobserve(bar);
                    return;
                }

                // Slow down the fill animation significantly
                fill.style.transition = 'width 5.5s ease-out';
                requestAnimationFrame(() => {
                    fill.style.width = target + '%';
                });

                // Count up percent label
                const duration = 6000; // slower counter
                const start = performance.now();
                function step(now) {
                    const progress = Math.min((now - start) / duration, 1);
                    const current = Math.floor(progress * target);
                    percentLabel.textContent = current + '%';
                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else {
                        const rect = bar.getBoundingClientRect();
                        burstConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 100);
                    }
                }
                requestAnimationFrame(step);

                obs.unobserve(bar);
            });
        }, { threshold: 0.4 });

        bars.forEach(b => observer.observe(b));
    }

    // Confetti system
    function initConfetti() {
        if (prefersReducedMotion) return;
        confettiCanvas = document.getElementById('confetti-canvas');
        if (!confettiCanvas) return;
        ctx = confettiCanvas.getContext('2d');

        function resize() {
            confettiCanvas.width = window.innerWidth;
            confettiCanvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        function loop() {
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            for (let i = confettiParticles.length - 1; i >= 0; i--) {
                const p = confettiParticles[i];
                p.vy += 0.02;
                p.x += p.vx;
                p.y += p.vy;
                p.rotation += p.spin;
                p.life -= 0.01;
                if (p.life <= 0 || p.y > confettiCanvas.height + 20) {
                    confettiParticles.splice(i, 1);
                    continue;
                }
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation);
                ctx.globalAlpha = Math.max(p.life, 0);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size * 0.6);
                ctx.restore();
            }
            confettiRAF = requestAnimationFrame(loop);
        }
        loop();

        // Periodic bursts removed to reduce distraction
    }

    function burstConfetti(x, y, count = 80) {
        if (!ctx) return;
        const colors = [flagColors.blue, flagColors.red, flagColors.yellow, flagColors.white];
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 4;
            confettiParticles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2,
                size: 6 + Math.random() * 6,
                rotation: Math.random() * Math.PI,
                spin: (Math.random() - 0.5) * 0.2,
                color: colors[Math.floor(Math.random() * colors.length)],
                life: 0.9 + Math.random() * 0.6
            });
        }
    }

    // Section title festive hover
    function initFestiveTitleEffects() {
        const titles = document.querySelectorAll('.section-title');
        titles.forEach(title => {
            title.addEventListener('mouseenter', () => {
                if (!prefersReducedMotion) {
                    title.style.animation = 'wiggle 0.6s ease';
                    title.style.boxShadow = '0 10px 24px rgba(180,65,62,0.25)';
                    const rect = title.getBoundingClientRect();
                    burstConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 60);
                }
            });
            title.addEventListener('mouseleave', () => {
                title.style.animation = '';
                title.style.boxShadow = '';
            });
        });
    }


    // Console message with Philippines flag
    console.log(`
    Welcome to Julienne Panganiban's Resume!
    
    Built with a warm & neutral palette:
    Deep warm red: #b4413e
    Coral red: #e1645e  
    Sand tan: #d9c0a3
    Soft beige: #f3e7d8
    
    ✨
    `);
});

// Additional CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes bounce {
        0%, 20%, 53%, 80%, 100% {
            transform: translateY(0);
        }
        40%, 43% {
            transform: translateY(-10px);
        }
        70% {
            transform: translateY(-5px);
        }
        90% {
            transform: translateY(-2px);
        }
    }
    
    .contact-item, .skill-tag, .experience-item, .reference-item, .language-item, .proficiency {
        transition: all 0.3s ease;
    }

    @keyframes wiggle {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(2deg); }
        50% { transform: rotate(-2deg); }
        75% { transform: rotate(1deg); }
    }

    .glow-name {
        animation: glowPulse 2.4s ease-in-out infinite;
    }

    @keyframes glowPulse {
        0%, 100% { text-shadow: 0 0 6px rgba(252,209,22,0.35), 0 0 12px rgba(0,56,168,0.25); }
        50% { text-shadow: 0 0 10px rgba(252,209,22,0.6), 0 0 20px rgba(206,17,38,0.35); }
    }
`;
document.head.appendChild(style);
