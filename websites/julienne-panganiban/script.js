// Julienne Panganiban Resume - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations and interactions
    initScrollAnimations();
    initSkillTagAnimations();
    initContactAnimations();
    initLoadingAnimations();
    
    // Philippines flag colors for dynamic effects
    const flagColors = {
        blue: '#0038a8',
        red: '#ce1126',
        yellow: '#fcd116',
        white: '#ffffff'
    };

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

        // Observe all sections
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });
    }

    // Skill tag interactions
    function initSkillTagAnimations() {
        const skillTags = document.querySelectorAll('.skill-tag');
        
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                // Random color animation from flag colors
                const colors = [flagColors.blue, flagColors.red];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                this.style.background = `linear-gradient(135deg, ${randomColor}, ${randomColor}dd)`;
                
                // Add bounce effect
                this.style.transform = 'translateY(-5px) scale(1.05)';
            });
            
            tag.addEventListener('mouseleave', function() {
                // Reset to original blue
                this.style.background = `linear-gradient(135deg, ${flagColors.blue}, #1a4fb8)`;
                this.style.transform = 'translateY(0) scale(1)';
            });
            
            // Click effect
            tag.addEventListener('click', function() {
                this.style.animation = 'pulse 0.6s ease-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 600);
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
    function initLoadingAnimations() {
        // Animate elements on page load
        setTimeout(() => {
            document.body.classList.add('loading');
        }, 100);
        
        // Stagger section animations
        const sections = document.querySelectorAll('.section');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.style.animation = `slideUp 0.8s ease-out forwards`;
            }, index * 200);
        });
    }

    // Experience item hover effects
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.background = `linear-gradient(135deg, ${flagColors.white}, #f0f8ff)`;
            this.style.borderLeftColor = flagColors.yellow;
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)';
            this.style.borderLeftColor = flagColors.blue;
        });
    });

    // Reference item interactions
    const referenceItems = document.querySelectorAll('.reference-item');
    referenceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.borderTopColor = flagColors.yellow;
            this.style.background = `linear-gradient(135deg, ${flagColors.white}, #fff8dc)`;
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.borderTopColor = flagColors.red;
            this.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)';
        });
    });

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

    // Smooth scrolling for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add floating animation to profile image
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        setInterval(() => {
            profileImage.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                profileImage.style.transform = 'translateY(0)';
            }, 1000);
        }, 3000);
    }

    // Add achievement badge pulse animation
    const achievement = document.querySelector('.achievement');
    if (achievement) {
        setInterval(() => {
            achievement.style.animation = 'pulse 1.5s ease-in-out';
            setTimeout(() => {
                achievement.style.animation = '';
            }, 1500);
        }, 5000);
    }

    // Console message with Philippines flag
    console.log(`
    🇵🇭 Welcome to Julienne Panganiban's Resume! 🇵🇭
    
    Built with Philippines flag colors:
    🔵 Blue: #0038a8
    🔴 Red: #ce1126  
    🟡 Yellow: #fcd116
    ⚪ White: #ffffff
    
    Mabuhay! 🎉
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
`;
document.head.appendChild(style);
