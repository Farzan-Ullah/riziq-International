// ========================================
// ADVANCED ANIMATIONS CONTROLLER
// ========================================

// Scroll Reveal Animation
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    };

    // Initial check
    revealOnScroll();

    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
}

// Parallax Effect for Hero Section
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;

        if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// Animated Counter for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };

        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counter.classList.contains('counted')) {
                    counter.classList.add('counted');
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

// Stagger Animation for Grid Items
function staggerGridAnimation() {
    const grids = document.querySelectorAll('.grid');

    grids.forEach(grid => {
        const items = grid.querySelectorAll('.card, .job-card, .testimonial-card');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate-fadeInUp');
                        }, index * 100);
                    });
                    observer.unobserve(grid);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(grid);
    });
}

// Typing Effect for Hero Title
function typingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.opacity = '1';

    let index = 0;
    const speed = 50;

    function type() {
        if (index < text.length) {
            heroTitle.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    // Start typing after a short delay
    setTimeout(type, 500);
}

// Smooth Scroll with Offset
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mouse Follow Effect for Cards
function initMouseFollow() {
    const cards = document.querySelectorAll('.card, .job-card, .testimonial-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Ripple Effect on Buttons
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
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

    // Add ripple styles
    const style = document.createElement('style');
    style.textContent = `
    .btn {
      position: relative;
      overflow: hidden;
    }
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple-animation 0.6s ease-out;
      pointer-events: none;
    }
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
    document.head.appendChild(style);
}

// Floating Elements Animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.card-icon, .feature-icon, .service-icon');

    floatingElements.forEach((element, index) => {
        element.style.animation = `float ${3 + (index % 3)}s ease-in-out infinite`;
        element.style.animationDelay = `${index * 0.2}s`;
    });
}

// Page Transition Effect
function initPageTransition() {
    // Create transition overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
    z-index: 9999;
    transform: translateY(-100%);
    transition: transform 0.5s ease;
    pointer-events: none;
  `;
    document.body.appendChild(overlay);

    // Animate on page load
    window.addEventListener('load', () => {
        overlay.style.transform = 'translateY(0)';
        setTimeout(() => {
            overlay.style.transform = 'translateY(100%)';
        }, 500);
    });
}

// Navbar Background on Scroll
function initNavbarScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--bg-white)';
            header.style.backdropFilter = 'none';
        }
    });
}

// Image Lazy Loading with Fade In
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';

                img.onload = () => {
                    img.style.opacity = '1';
                    img.removeAttribute('data-src');
                };

                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Text Reveal Animation
function initTextReveal() {
    const textElements = document.querySelectorAll('.section-title h2, .page-header h1');

    textElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';

        const words = text.split(' ');
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `all 0.5s ease ${index * 0.1}s`;
            element.appendChild(span);
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const spans = entry.target.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(element);
    });
}

// Initialize All Animations
document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initParallax();
    animateCounters();
    staggerGridAnimation();
    initSmoothScroll();
    initRippleEffect();
    initFloatingElements();
    initNavbarScroll();
    initLazyLoading();
    initTextReveal();

    // Mouse follow effect (disable on mobile for performance)
    if (window.innerWidth > 768) {
        initMouseFollow();
    }

    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
});

// Add loaded class styles
const loadedStyles = document.createElement('style');
loadedStyles.textContent = `
  body:not(.loaded) * {
    animation-play-state: paused !important;
  }
`;
document.head.appendChild(loadedStyles);