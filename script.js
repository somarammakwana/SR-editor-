// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // Mobile Navigation
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('open');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('open');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            });
        });
    }

    // Header Scroll Effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Initialize Swiper Testimonials
    if (document.querySelector('.testimonials-slider')) {
        const testimonialSwiper = new Swiper('.testimonials-slider', {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            }
        });
    }

    // Portfolio Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length && portfolioItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Initialize Fancybox for Portfolio
    if (typeof Fancybox !== 'undefined') {
        Fancybox.bind("[data-fancybox]", {
            // Your custom options
        });
    }

    // Animate Stats Counter
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length) {
        statNumbers.forEach(stat => {
            const target = +stat.getAttribute('data-count');
            const count = +stat.innerText;
            const increment = target / 100;
            
            if (count < target) {
                stat.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 10);
            } else {
                stat.innerText = target;
            }
            
            function updateCount() {
                const current = +stat.innerText;
                if (current < target) {
                    stat.innerText = Math.ceil(current + increment);
                    setTimeout(updateCount, 10);
                } else {
                    stat.innerText = target;
                }
            }
        });
        
        // Start counting when stats section is in view
        const statsSection = document.querySelector('.stats');
        if (statsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        statNumbers.forEach(stat => {
                            const target = +stat.getAttribute('data-count');
                            let count = 0;
                            const duration = 2000; // 2 seconds
                            const increment = target / (duration / 16); // 60fps
                            
                            const update = () => {
                                count += increment;
                                if (count < target) {
                                    stat.innerText = Math.floor(count);
                                    requestAnimationFrame(update);
                                } else {
                                    stat.innerText = target;
                                }
                            };
                            
                            update();
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(statsSection);
        }
    }

    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });
    }

    // Form Floating Labels
    const formGroups = document.querySelectorAll('.form-group');
    if (formGroups.length) {
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea, select');
            if (input) {
                // Check if input has value on load
                if (input.value) {
                    group.querySelector('label').classList.add('active');
                }
                
                input.addEventListener('focus', function() {
                    group.querySelector('label').classList.add('active');
                });
                
                input.addEventListener('blur', function() {
                    if (!this.value) {
                        group.querySelector('label').classList.remove('active');
                    }
                });
            }
        });
    }

    // Hero Video Fallback
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.addEventListener('error', function() {
            // If video fails to load, set a background image instead
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.backgroundImage = 'url("assets/hero-fallback.jpg")';
                heroVideo.style.display = 'none';
            }
        });
    }

    // GSAP Animations
    if (typeof gsap !== 'undefined') {
        // Animate hero content
        gsap.from('.hero-content h1, .hero-content p, .cta-buttons', {
            duration: 1,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out',
            delay: 0.5
        });

        // ScrollTrigger animations for sections
        gsap.utils.toArray('section').forEach(section => {
            if (section.id !== 'home') {
                gsap.from(section, {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    },
                    y: 50,
                    opacity: 0,
                    duration: 1
                });
            }
        });

        // Animate service cards
        gsap.utils.toArray('.service-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: '.services-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                duration: 0.5,
                delay: i * 0.1
            });
        });
    }
});