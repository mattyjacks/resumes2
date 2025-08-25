// WhatsApp functionality
function openWhatsApp() {
    // Replace with Kyle's actual phone number (without + and spaces)
    const phoneNumber = "639123456789"; // This should be Kyle's actual WhatsApp number
    const message = encodeURIComponent("I want to hire you, Kyle!");
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    
    window.open(whatsappURL, '_blank');
}

// Smooth scrolling for any internal links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scroll behavior to all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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

    // Scroll-reveal for .reveal and .section
    const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -50px 0px' };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Fallback inline styles for older CSS
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealTargets = document.querySelectorAll('.reveal, .section');
    revealTargets.forEach(el => {
        // Initial hidden state (in case CSS didn't load yet)
        el.style.opacity = el.style.opacity || '0';
        el.style.transform = el.style.transform || 'translateY(30px)';
        el.style.transition = el.style.transition || 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    // Add click effect to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }, 100);
        });
    });

    // Add hover effect to certification items
    const certItems = document.querySelectorAll('.cert-item');
    certItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #e3f2fd, #bbdefb)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, #f8f9fa, #e9ecef)';
        });
    });

    // Phone number click tracking (optional analytics)
    const phoneLink = document.querySelector('.phone-link');
    if (phoneLink) {
        phoneLink.addEventListener('click', function() {
            console.log('Phone number clicked');
            // You can add analytics tracking here if needed
        });
    }

    // Add typing effect to the name (optional enhancement)
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const originalText = nameElement.textContent;
        nameElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                nameElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
});

// Add some interactive features for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Create floating Philippines flag elements (subtle animation)
    function createFloatingElements() {
        const colors = ['#0038a8', '#ce1126', '#fcd116'];
        
        for (let i = 0; i < 3; i++) {
            const element = document.createElement('div');
            element.style.position = 'fixed';
            element.style.width = '10px';
            element.style.height = '10px';
            element.style.backgroundColor = colors[i];
            element.style.borderRadius = '50%';
            element.style.opacity = '0.1';
            element.style.pointerEvents = 'none';
            element.style.zIndex = '-1';
            element.style.left = Math.random() * window.innerWidth + 'px';
            element.style.top = window.innerHeight + 'px';
            
            document.body.appendChild(element);
            
            // Animate upward
            let position = window.innerHeight;
            const speed = 0.5 + Math.random() * 0.5;
            
            const animate = () => {
                position -= speed;
                element.style.top = position + 'px';
                
                if (position < -20) {
                    element.remove();
                } else {
                    requestAnimationFrame(animate);
                }
            };
            
            animate();
        }
    }
    
    // Create floating elements periodically (very subtle)
    setInterval(createFloatingElements, 5000);

    // 3D Tilt effect on elements with .tilt
    const tiltElements = document.querySelectorAll('.tilt');
    tiltElements.forEach((el) => {
        const strength = 10; // degrees
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateY = ((x / rect.width) - 0.5) * (strength * 2);
            const rotateX = -((y / rect.height) - 0.5) * (strength * 2);
            el.style.transform = `perspective(700px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg)';
        });
    });

    // Parallax for elements with .parallax
    const parallaxEls = Array.from(document.querySelectorAll('.parallax'));
    if (parallaxEls.length) {
        const onMouseMove = (e) => {
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            const dx = (e.clientX - cx) / cx;
            const dy = (e.clientY - cy) / cy;
            parallaxEls.forEach(el => {
                const speed = parseFloat(el.getAttribute('data-speed') || '1');
                const tx = dx * speed * 10; // px
                const ty = dy * speed * 10; // px
                el.style.transform = `translate(${tx}px, ${ty}px)`;
            });
        };
        window.addEventListener('mousemove', onMouseMove);
    }

    // Starfield background on #bg-stars
    const starCanvas = document.getElementById('bg-stars');
    if (starCanvas && starCanvas.getContext) {
        const ctx = starCanvas.getContext('2d');
        let width, height, stars;

        const init = () => {
            width = starCanvas.width = window.innerWidth;
            height = starCanvas.height = window.innerHeight;
            const count = Math.min(200, Math.floor((width * height) / 12000));
            stars = new Array(count).fill(0).map(() => ({
                x: Math.random() * width,
                y: Math.random() * height,
                r: Math.random() * 1.5 + 0.2,
                a: Math.random() * 0.6 + 0.2,
                s: Math.random() * 0.02 + 0.005 // twinkle speed
            }));
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = 'rgba(255,255,255,0.9)';
            stars.forEach(star => {
                star.a += star.s;
                const alpha = (Math.sin(star.a) + 1) / 2 * 0.8 + 0.1; // 0.1 - 0.9
                ctx.globalAlpha = alpha;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;
            requestAnimationFrame(draw);
        };

        window.addEventListener('resize', init);
        init();
        draw();
    }
});
