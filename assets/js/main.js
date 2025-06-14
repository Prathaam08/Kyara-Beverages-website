        // Mobile Navigation Toggle
        const mobileToggle = document.querySelector('.mobile-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Form submission handling
        const contactForm = document.getElementById('contactForm');
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                // Show success animation
                const submitBtn = document.querySelector('.submit-btn');
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = '#27ae60';
                
                // Reset after delay
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
                    submitBtn.style.background = '';
                }, 3000);
            } else {
                alert('Please fill in all fields.');
            }
        });
        
        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements
        document.querySelectorAll('.section-title h2, .about-text, .about-image, .product-card, .contact-info, .contact-form').forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
        
        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.08)';
                header.style.height = '70px';
            } else {
                header.style.boxShadow = 'none';
                header.style.height = '80px';
            }
        });
        
        // Stagger animations for section titles
        document.querySelectorAll('.section-title h2').forEach((title, index) => {
            title.style.animationDelay = `${index * 0.2}s`;
        });
        
        // Initialize animations
        window.addEventListener('load', () => {
            document.querySelector('.section-title h2').classList.add('animate');
        });
    