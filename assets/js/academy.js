// ========================================
// IPACE DATA ACADEMY - JAVASCRIPT
// ========================================

// ========================================
// GLOBAL FUNCTIONS (Accessible from HTML onclick)
// ========================================

// ========================================
// GLOBAL FUNCTIONS (Accessible from HTML onclick)
// ========================================

// Close Notification Bar (COMMENTED OUT - BAR NEVER CLOSES)
/*
function closeNotification() {
    const notificationBar = document.getElementById('notificationBar');
    if (notificationBar) {
        notificationBar.classList.add('hidden');
        localStorage.setItem('notificationClosed', 'true');
    }
}
*/

// Toggle Mobile Menu
function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.getElementById('hamburger');
    
    if (mobileMenu && hamburger) {
        mobileMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

// ========================================
// DOM CONTENT LOADED
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // CHECK NOTIFICATION STATUS ON LOAD
    // ========================================
    window.addEventListener('load', function() {
        if (localStorage.getItem('notificationClosed') === 'true') {
            const notificationBar = document.getElementById('notificationBar');
            if (notificationBar) {
                notificationBar.classList.add('hidden');
            }
        }
    });
    
    // ========================================
    // MOBILE MENU EVENT LISTENERS
    // ========================================
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu && hamburger) {
            if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
    
    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.menu-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
            if (hamburger) {
                hamburger.classList.remove('active');
            }
            document.body.style.overflow = '';
        });
    });
    
    // ========================================
    // SMOOTH SCROLLING
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // ========================================
    // ACTIVE NAV LINK ON SCROLL
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNav() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150; // Adjust offset for header height
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.menu-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);
    
    // ========================================
    // VIDEO PLAY BUTTON (Placeholder)
    // ========================================
    const videoPlaceholder = document.querySelector('.video-placeholder');
    
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            alert('Video player will open here. Add your YouTube/Vimeo embed code.');
        });
    }
    
    // ========================================
    // PROGRAM CARD HOVER EFFECTS
    // ========================================
    const programCards = document.querySelectorAll('.program-card');
    
    programCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ========================================
    // ANIMATION ON SCROLL (Fade In Up)
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.program-card, .approach-card, .tool-card, .audience-card, .why-card, .pathway-card');
    animatedElements.forEach(el => {
        el.classList.add('animate-fade-in-up');
        observer.observe(el);
    });
    
    // ========================================
    // COUNTER ANIMATION (For Stats)
    // ========================================
    const counters = document.querySelectorAll('.stat-number');
    const counterSpeed = 200;
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const increment = target / counterSpeed;
                
                const updateCounter = () => {
                    const count = +counter.innerText;
                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCounter, 1);
                    } else {
                        counter.innerText = target + '+';
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => counterObserver.observe(counter));
    
    // ========================================
    // LAZY LOADING IMAGES
    // ========================================
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ========================================
    // CONSOLE MESSAGE
    // ========================================
    console.log('%c🚀 iPace Data Academy', 'color: #C6A000; font-size: 20px; font-weight: bold;');
    console.log('%cBuilt with passion for data education', 'color: #666; font-size: 12px;');
    
});

// ========================================
// TESTIMONIAL SLIDER
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dot');
    let currentIndex = 0;
    let slideInterval;
    
    if (testimonials.length > 0) {
        // Show first testimonial
        testimonials[0].classList.add('active');
        if (dots[0]) {
            dots[0].classList.add('active');
        }
        
        // Auto slide every 5 seconds
        function startSliding() {
            slideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % testimonials.length;
                showTestimonial(currentIndex);
            }, 5000);
        }
        
        // Stop sliding when hovering
        function stopSliding() {
            clearInterval(slideInterval);
        }
        
        // Show specific testimonial
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.classList.remove('active', 'prev');
                if (i === index) {
                    testimonial.classList.add('active');
                } else if (i === (index - 1 + testimonials.length) % testimonials.length) {
                    testimonial.classList.add('prev');
                }
            });
            
            dots.forEach((dot, i) => {
                dot.classList.remove('active');
                if (i === index) {
                    dot.classList.add('active');
                }
            });
        }
        
        // Start sliding
        startSliding();
        
        // Add dots
        const dotsContainer = document.querySelector('.testimonial-dots');
        if (dotsContainer) {
            testimonials.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('testimonial-dot');
                dot.addEventListener('click', () => {
                    currentIndex = index;
                    showTestimonial(currentIndex);
                    startSliding();
                });
                dotsContainer.appendChild(dot);
            });
        }
        
        // Pause on hover
        const slider = document.querySelector('.testimonials-slider');
        if (slider) {
            slider.addEventListener('mouseenter', stopSliding);
            slider.addEventListener('mouseleave', startSliding);
        }
    }
});

// ========================================
// EVENT SECTION TOGGLE (REVISED)
// ========================================

function toggleEventStatus() {
    const eventCard = document.getElementById('eventCard');
    const noEventCard = document.getElementById('noEventCard');
    const toggleInput = document.getElementById('eventToggle');
    
    if (eventCard && noEventCard && toggleInput) {
        if (toggleInput.checked) {
            // Event Active
            noEventCard.style.display = 'none';
            eventCard.style.display = 'flex';
        } else {
            // No Event
            eventCard.style.display = 'none';
            noEventCard.style.display = 'flex';
        }
    }
}