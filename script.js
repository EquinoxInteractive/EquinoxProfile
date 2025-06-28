 // Mobile menu toggle
            document.getElementById('mobile-menu-button').addEventListener('click', function() {
                const menu = document.getElementById('mobile-menu');
                menu.classList.toggle('hidden');
            });

            // Back to top button
            const backToTopButton = document.getElementById('back-to-top');
            
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    backToTopButton.classList.remove('opacity-0', 'invisible');
                    backToTopButton.classList.add('opacity-100', 'visible');
                } else {
                    backToTopButton.classList.remove('opacity-100', 'visible');
                    backToTopButton.classList.add('opacity-0', 'invisible');
                }
            });
            
            backToTopButton.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                        
                        // Close mobile menu if open
                        const mobileMenu = document.getElementById('mobile-menu');
                        if (!mobileMenu.classList.contains('hidden')) {
                            mobileMenu.classList.add('hidden');
                        }
                    }
                });
            });

            // Animation on scroll
            function animateOnScroll() {
                const elements = document.querySelectorAll('.slide-up, .fade-in');
                
                elements.forEach(element => {
                    const elementPosition = element.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    
                    if (elementPosition < windowHeight - 100) {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }
                });
            }
            
            // Set initial state for animated elements
            document.querySelectorAll('.slide-up').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            });
            
            document.querySelectorAll('.fade-in').forEach(el => {
                el.style.opacity = '0';
                el.style.transition = 'opacity 1s ease';
            });
            
            // Run once on page load
            animateOnScroll();
            
            // Then run on scroll
            window.addEventListener('scroll', animateOnScroll);