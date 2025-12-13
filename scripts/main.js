document.addEventListener('DOMContentLoaded', () => {
    console.log('Wabi Housing loaded');

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Fade in elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    document.querySelectorAll('.service-card, .team-member, .section-title').forEach((el) => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Modal Logic (Event Delegation)
document.addEventListener('click', function (e) {
    // Check if clicked element or parent is a trigger
    const trigger = e.target.closest('[data-modal-target]');
    if (trigger) {
        const memberId = trigger.getAttribute('data-modal-target');
        const modal = document.getElementById('modal-' + memberId);
        const overlay = document.getElementById('modal-overlay');

        if (modal && overlay) {
            overlay.style.display = 'block';
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    // Check if clicked element is close button or overlay
    if (e.target.closest('.close-modal') || e.target.id === 'modal-overlay') {
        const overlay = document.getElementById('modal-overlay');
        const modals = document.querySelectorAll('.modal');

        if (overlay) overlay.style.display = 'none';
        modals.forEach(modal => modal.style.display = 'none');
        document.body.style.overflow = 'auto';
    }
});

// Close modal when clicking escape
document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        const overlay = document.getElementById('modal-overlay');
        const modals = document.querySelectorAll('.modal');
        if (overlay) overlay.style.display = 'none';
        modals.forEach(modal => modal.style.display = 'none');
        document.body.style.overflow = 'auto';
    }
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMobile = document.querySelector('.nav-mobile');

    if (menuToggle && navMobile) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMobile.classList.toggle('active');

            // Prevent scrolling when menu is open
            if (navMobile.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });

        // Close menu when clicking a link
        navMobile.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMobile.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }
});
