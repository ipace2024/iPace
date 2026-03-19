// Policies Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll for policy navigation links
    const policyLinks = document.querySelectorAll('.policy-nav-link');
    policyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add active class to policy cards when in viewport
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-100px 0px 0px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    // Observe all policy cards
    document.querySelectorAll('.policy-card').forEach(card => {
        observer.observe(card);
    });

    // Sticky policy navigation on scroll (desktop only)
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.policies-nav');
        if (window.scrollY > 200 && window.innerWidth > 768) {
            nav.classList.add('sticky-nav');
        } else {
            nav.classList.remove('sticky-nav');
        }
    });
});