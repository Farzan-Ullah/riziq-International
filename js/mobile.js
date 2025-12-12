// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    // We don't need to create the toggle because it already exists in the HTML as .mobile-toggle
    const nav = document.querySelector('.navbar'); // Changed to match HTML
    const navMenu = document.querySelector('.nav-menu'); // Changed from .nav-links
    const mobileToggle = document.querySelector('.mobile-toggle'); // Changed from .menu-toggle

    // If element exists, handle interactions
    if (navMenu && mobileToggle) {
        // Toggle menu logic is likely in main.js too, so we'll just add extra enhancements

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!nav.contains(e.target) && navMenu.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Add enhancements to links
        const navItems = navMenu.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', function () {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Enhanced toggle that works with existing main.js
        mobileToggle.addEventListener('click', function () {
            // main.js toggles the class, here we just handle body scroll
            if (!this.classList.contains('active')) {
                // It's about to open (or main.js opened it), lock scroll
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Scroll Reveal Animations for Mobile
    const scrollReveal = () => {
        const reveals = document.querySelectorAll('.card, .service-card, .job-card, .blog-card, .testimonial-card, .stat-card, .feature-card, .step-item, .contact-info-card, .notification-item');

        reveals.forEach(element => {
            if (!element.classList.contains('scroll-reveal')) {
                element.classList.add('scroll-reveal');
            }

            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 100;

            if (elementTop < window.innerHeight - elementVisible) {
                // Add both classes to support different CSS reveal conventions
                // some stylesheets use `.scroll-reveal.active` while others
                // use `.scroll-reveal.revealed` — add both to avoid flicker.
                element.classList.add('active');
                element.classList.add('revealed');
            }
        });
    };

    // Run on scroll
    window.addEventListener('scroll', scrollReveal);
    scrollReveal(); // Run on load

    // Touch-friendly interactions
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');

        const touchElements = document.querySelectorAll('.card, .btn, .job-card, .blog-card');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function () {
                this.style.transform = 'scale(0.98)';
            });
            element.addEventListener('touchend', function () {
                this.style.transform = '';
            });
        });
    }

    // Viewport height fix
    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVH();
    window.addEventListener('resize', setVH);
});
