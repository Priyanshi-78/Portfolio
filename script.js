/* ============================================================
   Minimal JavaScript — Portfolio
   ============================================================ */
(function() {
    'use strict';

    // Elements
    const header = document.querySelector('.header');
    const navToggle = document.getElementById('nav-toggle');
    const navList = document.getElementById('nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    /* -------------------------------------------------------
       Mobile Nav Toggle
       ------------------------------------------------------- */
    if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
            const isActive = navToggle.classList.toggle('active');
            navList.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', isActive);
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navList.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navList.classList.contains('active')) {
                navToggle.classList.remove('active');
                navList.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    /* -------------------------------------------------------
       Active Nav Link on Scroll
       ------------------------------------------------------- */
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        let current = '';
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    /* -------------------------------------------------------
       Header Scroll Effect
       ------------------------------------------------------- */
    function handleHeaderScroll() {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }

    /* -------------------------------------------------------
       Scroll Reveal (Intersection Observer)
       ------------------------------------------------------- */
    function setupScrollReveal() {
        const elements = document.querySelectorAll(
            '.section-header, .hero-content, .hero-image-wrapper, ' +
            '.about-content, .edu-card, .skill-card, .project-card, ' +
            '.achievement-item, .resume-content, .contact-card'
        );

        if (!('IntersectionObserver' in window)) {
            elements.forEach(el => el.classList.add('visible'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

        elements.forEach(el => {
            el.classList.add('reveal');
            observer.observe(el);
        });
    }

    /* -------------------------------------------------------
       Throttle
       ------------------------------------------------------- */
    function throttle(fn, limit) {
        let waiting = false;
        return function() {
            if (!waiting) {
                fn.apply(this, arguments);
                waiting = true;
                setTimeout(() => { waiting = false; }, limit);
            }
        };
    }

    /* -------------------------------------------------------
       Init
       ------------------------------------------------------- */
    function init() {
        setupScrollReveal();
        updateActiveLink();
        handleHeaderScroll();

        const onScroll = throttle(() => {
            updateActiveLink();
            handleHeaderScroll();
        }, 100);

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('load', updateActiveLink);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
const buttons = document.querySelectorAll(".hero-btn");

buttons.forEach(button => {
    button.addEventListener("click", function () {
        buttons.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
    });
});
