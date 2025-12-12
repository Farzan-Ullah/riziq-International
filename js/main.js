// ========================================
// RIZIQ INTERNATIONAL - MAIN JAVASCRIPT
// ========================================

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// Header Scroll Effect
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Active Navigation Link
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', setActiveNav);

// Smooth Scroll for Anchor Links
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

// WhatsApp Contact Function
function openWhatsApp() {
    const phoneNumber = '917006001199'; // Format: country code + number
    const message = encodeURIComponent('Hello! I am interested in your overseas job consultancy services.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

// Call Now Function
function callNow() {
    window.location.href = 'tel:+917006001199';
}

// Form Validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'var(--error-color)';
        } else {
            input.style.borderColor = 'var(--border-color)';
        }
    });

    // Email validation
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && emailInput.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            isValid = false;
            emailInput.style.borderColor = 'var(--error-color)';
        }
    }

    // Phone validation
    const phoneInput = form.querySelector('input[type="tel"]');
    if (phoneInput && phoneInput.value) {
        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(phoneInput.value.replace(/\s/g, ''))) {
            isValid = false;
            phoneInput.style.borderColor = 'var(--error-color)';
        }
    }

    return isValid;
}

// Apply Form Submission
function handleApplyForm(event) {
    event.preventDefault();

    if (!validateForm('applyForm')) {
        showNotification('Please fill all required fields correctly', 'error');
        return;
    }

    // Get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Simulate CV upload - just get the filename
    const cvInput = document.getElementById('cvUpload');
    const cvName = cvInput && cvInput.files[0] ? cvInput.files[0].name : 'No CV Uploaded';

    const application = {
        id: Date.now(),
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        qualification: data.qualification,
        experience: data.experience,
        country: data.country,
        jobType: data.jobType,
        cv: cvName,
        status: 'Pending',
        appliedAt: new Date().toISOString()
    };

    // Save to LocalStorage (Simulated Backend)
    const applications = JSON.parse(localStorage.getItem('riziq_applications') || '[]');
    applications.unshift(application); // Add to top
    localStorage.setItem('riziq_applications', JSON.stringify(applications));

    console.log('Application submitted:', application);

    // Show success message
    showNotification('Application submitted successfully! We will contact you soon.', 'success');

    // Reset form
    event.target.reset();
    const preview = document.getElementById('filePreview');
    if (preview) preview.innerHTML = '';

    // Redirect to home after 2 seconds
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// Contact Form Submission
function handleContactForm(event) {
    event.preventDefault();

    if (!validateForm('contactForm')) {
        showNotification('Please fill all required fields correctly', 'error');
        return;
    }

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const contactMessage = {
        id: Date.now(),
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        receivedAt: new Date().toISOString(),
        status: 'Unread'
    };

    // Save to LocalStorage (Simulated Backend)
    const messages = JSON.parse(localStorage.getItem('riziq_messages') || '[]');
    messages.unshift(contactMessage);
    localStorage.setItem('riziq_messages', JSON.stringify(messages));

    console.log('Contact form submitted:', contactMessage);

    showNotification('Message sent successfully! We will get back to you soon.', 'success');
    event.target.reset();
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    padding: 16px 24px;
    background: ${type === 'success' ? 'var(--success-color)' : type === 'error' ? 'var(--error-color)' : 'var(--primary-color)'};
    color: white;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-xl);
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
    max-width: 350px;
    font-weight: 500;
  `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Job Search and Filter
function filterJobs() {
    const searchInput = document.getElementById('jobSearch');
    const countryFilter = document.getElementById('countryFilter');
    const skillFilter = document.getElementById('skillFilter');
    const jobCards = document.querySelectorAll('.job-card');

    if (!jobCards.length) return;

    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const selectedCountry = countryFilter ? countryFilter.value.toLowerCase() : '';
    const selectedSkill = skillFilter ? skillFilter.value.toLowerCase() : '';

    jobCards.forEach(card => {
        const title = card.querySelector('.job-title')?.textContent.toLowerCase() || '';
        const country = card.querySelector('.job-country')?.textContent.toLowerCase() || '';
        const requirements = card.querySelector('.job-requirements')?.textContent.toLowerCase() || '';

        const matchesSearch = title.includes(searchTerm) || country.includes(searchTerm) || requirements.includes(searchTerm);
        const matchesCountry = !selectedCountry || country.includes(selectedCountry);
        const matchesSkill = !selectedSkill || requirements.includes(selectedSkill);

        if (matchesSearch && matchesCountry && matchesSkill) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease-out';
        } else {
            card.style.display = 'none';
        }
    });
}

// Counter Animation
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Intersection Observer for Animations - HANDLED BY mobile.js NOW
// Keeping incomplete for counters if needed, but mobile.js handles that too.
// Removed to prevent conflict.

// File Upload Preview
function handleFileUpload(input) {
    const file = input.files[0];
    const preview = document.getElementById('filePreview');

    if (file && preview) {
        const fileName = file.name;
        const fileSize = (file.size / 1024).toFixed(2);
        preview.innerHTML = `
      <div style="padding: 12px; background: var(--bg-light); border-radius: var(--radius-md); margin-top: 8px;">
        <strong>Selected:</strong> ${fileName} (${fileSize} KB)
      </div>
    `;
    }
}

// Initialize Google Map (for contact page)
function initMap() {
    // Pulwama, Kashmir coordinates
    const location = { lat: 33.8734, lng: 74.8936 };

    const mapElement = document.getElementById('map');
    if (mapElement && typeof google !== 'undefined') {
        const map = new google.maps.Map(mapElement, {
            zoom: 14,
            center: location,
            styles: [
                {
                    featureType: 'all',
                    elementType: 'geometry',
                    stylers: [{ color: '#f5f5f5' }]
                },
                {
                    featureType: 'water',
                    elementType: 'geometry',
                    stylers: [{ color: '#c9e9f6' }]
                }
            ]
        });

        new google.maps.Marker({
            position: location,
            map: map,
            title: 'Riziq International'
        });
    }
}

// Load more functionality (for testimonials, jobs, etc.)
function loadMore(buttonId, itemClass, increment = 3) {
    const button = document.getElementById(buttonId);
    const items = document.querySelectorAll(itemClass);

    if (!button || !items.length) return;

    let visibleCount = increment;

    // Initially hide items beyond the first set
    items.forEach((item, index) => {
        if (index >= visibleCount) {
            item.style.display = 'none';
        }
    });

    button.addEventListener('click', () => {
        visibleCount += increment;
        items.forEach((item, index) => {
            if (index < visibleCount) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease-out';
            }
        });

        if (visibleCount >= items.length) {
            button.style.display = 'none';
        }
    });
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question && answer) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all other items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer) otherAnswer.style.maxHeight = null;
                });

                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', initFAQ);

// -----------------------------
// Site-wide Notifications UI
// -----------------------------
function initNotifications() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    // Decide desktop vs mobile behavior
    const isDesktop = window.innerWidth >= 992;

    let notifBell = document.getElementById('notifBell');
    let notifDropdown = document.getElementById('notifDropdown');
    let navNotifLink = document.querySelector('.nav-notif-link');

    if (isDesktop) {
        // On desktop, add a nav menu item that links to notifications page
        if (!navNotifLink) {
            const ul = document.querySelector('.nav-menu');
            if (ul) {
                const li = document.createElement('li');
                li.className = 'nav-item nav-notif-item';
                li.innerHTML = `<a href="notifications.html" class="nav-link nav-notif-link">Notifications <span id="navNotifCount" class="notif-count-badge" style="display:none">0</span></a>`;
                ul.appendChild(li);
                navNotifLink = document.querySelector('.nav-notif-link');
            }
        }
    } else {
        // On mobile, keep bell in navbar
        if (!notifBell) {
            const wrapper = document.createElement('div');
            wrapper.className = 'notif-wrapper';
            wrapper.innerHTML = `
                <button id="notifBell" class="notif-bell" aria-label="Notifications">
                  <i class="fas fa-bell"></i><span id="notifCount" class="notif-count" style="display:none">0</span>
                </button>
                <div id="notifDropdown" class="notif-dropdown" style="display:none"></div>
            `;
            navbar.appendChild(wrapper);
            notifBell = document.getElementById('notifBell');
            notifDropdown = document.getElementById('notifDropdown');
        }
    }

    // Load notifications from localStorage or seed with sample data
    let notifications = JSON.parse(localStorage.getItem('siteNotifications') || 'null');
    if (!notifications) {
        notifications = [
            { id: 1, text: 'New job: Nurse in Germany', time: '2h ago', read: false, link: 'jobs.html' },
            { id: 2, text: 'New blog: CV tips for international jobs', time: '1d ago', read: false, link: 'blog.html' }
        ];
        localStorage.setItem('siteNotifications', JSON.stringify(notifications));
    }

    function updateBadge() {
        const count = notifications.filter(n => !n.read).length;
        const badgeMobile = document.getElementById('notifCount');
        const badgeNav = document.getElementById('navNotifCount');
        if (badgeMobile) {
            if (count > 0) { badgeMobile.style.display = 'inline-block'; badgeMobile.textContent = count; } else { badgeMobile.style.display = 'none'; }
        }
        if (badgeNav) {
            if (count > 0) { badgeNav.style.display = 'inline-block'; badgeNav.textContent = count; } else { badgeNav.style.display = 'none'; }
        }
    }

    function renderDropdown() {
        if (!notifDropdown) return;
        if (!notifications.length) {
            notifDropdown.innerHTML = '<div class="notif-empty">No notifications</div>';
            return;
        }

        notifDropdown.innerHTML = notifications.map(n => `
            <a href="${n.link}" class="notif-item ${n.read ? 'read' : ''}" data-id="${n.id}">
                <div class="notif-text">${n.text}</div>
                <div class="notif-time">${n.time}</div>
            </a>
        `).join('');

        // Mark as read when clicked (will navigate to link)
        notifDropdown.querySelectorAll('.notif-item').forEach(el => {
            el.addEventListener('click', (e) => {
                const id = Number(el.getAttribute('data-id'));
                const idx = notifications.findIndex(x => x.id === id);
                if (idx > -1) {
                    notifications[idx].read = true;
                    localStorage.setItem('siteNotifications', JSON.stringify(notifications));
                    updateBadge();
                }
            });
        });
    }

    if (notifBell) {
        notifBell.addEventListener('click', function (e) {
            e.stopPropagation();
            if (!notifDropdown) return;
            if (notifDropdown.style.display === 'none' || !notifDropdown.style.display) {
                renderDropdown();
                notifDropdown.style.display = 'block';
            } else {
                notifDropdown.style.display = 'none';
            }
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function () {
        if (notifDropdown) notifDropdown.style.display = 'none';
    });

    updateBadge();
}

document.addEventListener('DOMContentLoaded', initNotifications);

// -----------------------------
// Blog helper: ensure blog page shows (no-op if static content exists)
// -----------------------------
function initBlogHelpers() {
    // If blog listing container exists, ensure 'Read More' buttons point to proper anchors
    const blogLinks = document.querySelectorAll('.blog-link');
    blogLinks.forEach(link => {
        if (link.getAttribute('href') === '#') {
            // keep as placeholder or route to blog detail page later
            link.setAttribute('href', 'blog.html');
        }
    });
}

document.addEventListener('DOMContentLoaded', initBlogHelpers);

// -----------------------------
// Auth form initializer
// -----------------------------
function initAuthForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!email || !password) {
            if (typeof showNotification === 'function') {
                showNotification('Please enter email and password', 'error');
            } else {
                alert('Please enter email and password');
            }
            return;
        }

        // Basic email format check
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            if (typeof showNotification === 'function') {
                showNotification('Please enter a valid email address', 'error');
            } else {
                alert('Please enter a valid email address');
            }
            return;
        }

        // Demo sign-in behavior
        if (typeof showNotification === 'function') {
            showNotification('Signed in successfully (demo)', 'success');
        } else {
            alert('Signed in (demo)');
        }

        setTimeout(() => {
            window.location.href = 'apply.html';
        }, 700);
    });
}

document.addEventListener('DOMContentLoaded', initAuthForm);