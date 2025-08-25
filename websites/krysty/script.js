// Flower animations
const flowers = ['🌸', '🌺', '🌷', '🌹', '🌻', '🌼', '🌵', '💐', '🏵️'];

// Create floating flowers
function createFloatingFlowers() {
    const container = document.getElementById('flowersContainer');
    
    // Create initial flowers
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createFlower(container);
        }, i * 300);
    }
    
    // Continue creating flowers
    setInterval(() => {
        createFlower(container);
    }, 3000);
}

function createFlower(container) {
    const flower = document.createElement('div');
    flower.className = 'flower';
    flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
    flower.style.left = Math.random() * 100 + '%';
    flower.style.animationDuration = (Math.random() * 10 + 10) + 's';
    flower.style.fontSize = (Math.random() * 20 + 15) + 'px';
    
    container.appendChild(flower);
    
    // Remove flower after animation
    setTimeout(() => {
        flower.remove();
    }, 20000);
}

// Smooth scroll for navigation
function smoothScroll() {
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
}

// Animate elements on scroll
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 1s ease forwards';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe all sections and cards
    document.querySelectorAll('.section, .skill-card, .timeline-item, .reference-card').forEach(el => {
        observer.observe(el);
    });
}

// Add sparkle effect on hover
function addSparkleEffect() {
    const skillCards = document.querySelectorAll('.skill-card, .reference-card, .education-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            createSparkle(this);
        });
    });
}

function createSparkle(element) {
    const sparkle = document.createElement('span');
    sparkle.textContent = '✨';
    sparkle.style.position = 'absolute';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.fontSize = '20px';
    sparkle.style.animation = 'sparkle 1s ease forwards';
    
    const rect = element.getBoundingClientRect();
    sparkle.style.left = (Math.random() * rect.width) + 'px';
    sparkle.style.top = (Math.random() * rect.height) + 'px';
    
    element.style.position = 'relative';
    element.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add CSS for sparkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% {
            transform: translateY(0) scale(0);
            opacity: 1;
        }
        100% {
            transform: translateY(-50px) scale(1.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Typing effect for hero title
function typeWriter() {
    const title = document.querySelector('.hero-title');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    title.style.visibility = 'visible';
    
    let i = 0;
    function type() {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }
    
    setTimeout(type, 500);
}

// Add heart rain on WhatsApp button click
function addHeartRain() {
    const whatsappBtns = document.querySelectorAll('.whatsapp-btn, .whatsapp-btn-large');
    
    whatsappBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            createHeartRain(e.pageX, e.pageY);
        });
    });
}

function createHeartRain(x, y) {
    const hearts = ['💕', '💖', '💗', '💝', '💓', '💞'];
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'absolute';
            heart.style.left = (x + Math.random() * 100 - 50) + 'px';
            heart.style.top = y + 'px';
            heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.animation = 'heartFall 2s ease forwards';
            heart.style.zIndex = '9999';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 2000);
        }, i * 100);
    }
}

// Add heart fall animation
const heartStyle = document.createElement('style');
heartStyle.textContent = `
    @keyframes heartFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(heartStyle);

// Progress bars for skills (animated)
function animateProgressBars() {
    const skills = [
        { name: 'SEO Strategy', level: 95 },
        { name: 'Content Marketing', level: 92 },
        { name: 'Quality Assurance', level: 90 },
        { name: 'Data Analysis', level: 88 },
        { name: 'Client Relations', level: 93 }
    ];
    
    // Add progress bars to some skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skills.forEach((skill, index) => {
        if (skillCards[index]) {
            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            progressBar.innerHTML = `
                <div class="progress-fill" style="width: 0%"></div>
            `;
            
            // Add CSS for progress bars
            const progressStyle = document.createElement('style');
            progressStyle.textContent = `
                .progress-bar {
                    width: 100%;
                    height: 6px;
                    background: #ffe0ec;
                    border-radius: 3px;
                    margin-top: 10px;
                    overflow: hidden;
                }
                .progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #ff69b4, #ff1493);
                    border-radius: 3px;
                    transition: width 2s ease;
                }
            `;
            
            if (index === 0) {
                document.head.appendChild(progressStyle);
            }
            
            skillCards[index].appendChild(progressBar);
            
            // Animate on scroll
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            progressBar.querySelector('.progress-fill').style.width = skill.level + '%';
                        }, 200);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(skillCards[index]);
        }
    });
}

// Confetti effect for CTA section
function addConfettiEffect() {
    const ctaSection = document.querySelector('.cta');
    if (!ctaSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                createConfetti();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(ctaSection);
}

function createConfetti() {
    const colors = ['#ff69b4', '#ffb6c1', '#ffc0cb', '#ff1493', '#fff'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s ease-out forwards`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 30);
    }
}

// Add confetti fall animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Interactive flower cursor trail
function addFlowerCursorTrail() {
    let mouseX = 0;
    let mouseY = 0;
    let cursorFlowers = [];
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.pageX;
        mouseY = e.pageY;
        
        if (Math.random() > 0.9) {
            const flower = document.createElement('div');
            flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
            flower.style.position = 'absolute';
            flower.style.left = mouseX + 'px';
            flower.style.top = mouseY + 'px';
            flower.style.pointerEvents = 'none';
            flower.style.fontSize = '15px';
            flower.style.transition = 'all 1s ease';
            flower.style.opacity = '0.5';
            flower.style.zIndex = '1';
            
            document.body.appendChild(flower);
            cursorFlowers.push(flower);
            
            setTimeout(() => {
                flower.style.opacity = '0';
                flower.style.transform = 'translateY(20px) rotate(180deg)';
            }, 100);
            
            setTimeout(() => {
                flower.remove();
                cursorFlowers = cursorFlowers.filter(f => f !== flower);
            }, 1100);
            
            // Limit number of flowers
            if (cursorFlowers.length > 10) {
                const oldFlower = cursorFlowers.shift();
                oldFlower.remove();
            }
        }
    });
}

// Initialize all effects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createFloatingFlowers();
    smoothScroll();
    animateOnScroll();
    addSparkleEffect();
    typeWriter();
    addHeartRain();
    animateProgressBars();
    addConfettiEffect();
    addFlowerCursorTrail();
    
    // Add entrance animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.animation = 'fadeInUp 1s ease';
        }, 300);
    }
    
    // Animate section titles on scroll
    const sectionTitles = document.querySelectorAll('.section-title');
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'pulse 2s ease infinite';
            }
        });
    }, { threshold: 0.5 });
    
    sectionTitles.forEach(title => {
        titleObserver.observe(title);
    });
    
    // Add love message on console
    console.log('%c💕 Welcome to Krysty\'s Portfolio! 💕', 
                'color: #ff69b4; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);');
    console.log('%c🌸 Made with love and flowers 🌸', 
                'color: #ffb6c1; font-size: 16px;');
});

// Easter egg: Konami code for extra flowers
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        flowerExplosion();
        konamiCode = [];
    }
});

function flowerExplosion() {
    const flowerEmojis = ['🌸', '🌺', '🌷', '🌹', '🌻', '🌼', '💐', '🏵️', '🌵', '💕', '💖', '💗'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const flower = document.createElement('div');
            flower.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
            flower.style.position = 'fixed';
            flower.style.left = '50%';
            flower.style.top = '50%';
            flower.style.fontSize = Math.random() * 30 + 20 + 'px';
            flower.style.pointerEvents = 'none';
            flower.style.zIndex = '10000';
            flower.style.animation = `explode ${Math.random() * 2 + 1}s ease-out forwards`;
            
            document.body.appendChild(flower);
            
            setTimeout(() => {
                flower.remove();
            }, 3000);
        }, i * 20);
    }
    
    // Show message
    const message = document.createElement('div');
    message.textContent = '🌸 You found the secret! 🌸';
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.fontSize = '2rem';
    message.style.color = '#ff69b4';
    message.style.fontWeight = 'bold';
    message.style.zIndex = '10001';
    message.style.textShadow = '2px 2px 4px rgba(0,0,0,0.2)';
    message.style.animation = 'pulse 1s ease infinite';
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Add explode animation
const explodeStyle = document.createElement('style');
explodeStyle.textContent = `
    @keyframes explode {
        0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(
                calc(-50% + ${Math.random() * 400 - 200}px), 
                calc(-50% + ${Math.random() * 400 - 200}px)
            ) scale(2) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(explodeStyle);
