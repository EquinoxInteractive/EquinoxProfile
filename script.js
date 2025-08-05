// Mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    
    // Toggle menu visibility with slide-down animation
    if (menu.classList.contains('show')) {
        // Close menu
        menu.classList.remove('show');
        hamburgerIcon.classList.remove('active');
        setTimeout(() => {
            const menuItems = menu.querySelectorAll('.mobile-menu-item');
            menuItems.forEach(item => {
                item.style.transform = 'translateY(-10px)';
                item.style.opacity = '0';
            });
        }, 400);
    } else {
        // Open menu
        menu.classList.add('show');
        menu.classList.remove('hidden');
        hamburgerIcon.classList.add('active');
        setTimeout(() => {
            const menuItems = menu.querySelectorAll('.mobile-menu-item');
            menuItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = 'translateY(0)';
                    item.style.opacity = '1';
                }, index * 60);
            });
        }, 100);
    }
});

// Close mobile menu when clicking on menu links
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', function() {
        const menu = document.getElementById('mobile-menu');
        const hamburgerIcon = document.getElementById('hamburger-icon');
        
        // Close menu with animation
        menu.classList.remove('show');
        hamburgerIcon.classList.remove('active');
        setTimeout(() => {
            const menuItems = menu.querySelectorAll('.mobile-menu-item');
            menuItems.forEach(item => {
                item.style.transform = 'translateY(-10px)';
                item.style.opacity = '0';
            });
        }, 400);
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const menu = document.getElementById('mobile-menu');
    const menuButton = document.getElementById('mobile-menu-button');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    
    // Check if click is outside menu and menu button
    if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
        if (menu.classList.contains('show')) {
            menu.classList.remove('show');
            hamburgerIcon.classList.remove('active');
            setTimeout(() => {
                const menuItems = menu.querySelectorAll('.mobile-menu-item');
                menuItems.forEach(item => {
                    item.style.transform = 'translateY(-10px)';
                    item.style.opacity = '0';
                });
            }, 400);
        }
    }
});

// Handle window resize close menu if switching to desktop view
window.addEventListener('resize', function() {
    if (window.innerWidth >= 768) { // md breakpoint
        const menu = document.getElementById('mobile-menu');
        const hamburgerIcon = document.getElementById('hamburger-icon');
        
        if (menu.classList.contains('show')) {
            menu.classList.remove('show');
            hamburgerIcon.classList.remove('active');
        }
    }
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
            const hamburgerIcon = document.getElementById('hamburger-icon');
            if (mobileMenu.classList.contains('show')) {
                mobileMenu.classList.remove('show');
                hamburgerIcon.classList.remove('active');
                setTimeout(() => {
                    const menuItems = mobileMenu.querySelectorAll('.mobile-menu-item');
                    menuItems.forEach(item => {
                        item.style.transform = 'translateY(-10px)';
                        item.style.opacity = '0';
                    });
                }, 400);
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

// Header scroll effects
const navbar = document.querySelector('nav');
let lastScrollTop = 0;
let isScrolling = false;

window.addEventListener('scroll', function() {
    // Prevent multiple rapid scroll events
    if (!isScrolling) {
        window.requestAnimationFrame(function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const mobileMenu = document.getElementById('mobile-menu');
            
            // Don't hide header if mobile menu is open
            if (mobileMenu && mobileMenu.classList.contains('show')) {
                navbar.style.transform = 'translateY(0)';
                isScrolling = false;
                return;
            }
            
            // Header hide/show logic only for desktop or when mobile menu is closed
            if (scrollTop > 100) {
                if (scrollTop > lastScrollTop && scrollTop - lastScrollTop > 5) {
                    // Scrolling down
                    if (window.innerWidth >= 768 || !mobileMenu.classList.contains('show')) {
                        navbar.style.transform = 'translateY(-100%)';
                    }
                } else if (lastScrollTop - scrollTop > 5) {
                    // Scrolling up
                    navbar.style.transform = 'translateY(0)';
                }
            } else {
                // At top - always show header
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            
            // Back to top button
            const backToTopButton = document.getElementById('back-to-top');
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('opacity-0', 'invisible');
                backToTopButton.classList.add('opacity-100', 'visible');
            } else {
                backToTopButton.classList.remove('opacity-100', 'visible');
                backToTopButton.classList.add('opacity-0', 'invisible');
            }
            
            isScrolling = false;
        });
        
        isScrolling = true;
    }
});

// Smooth scrolling for anchor links - Enhanced version
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Always show navbar when navigating
            navbar.style.transform = 'translateY(0)';
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            const hamburgerIcon = document.getElementById('hamburger-icon');
            
            if (mobileMenu && mobileMenu.classList.contains('show')) {
                mobileMenu.classList.remove('show');
                if (hamburgerIcon) hamburgerIcon.classList.remove('active');
            }
            
            // Smooth scroll to target
            setTimeout(() => {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    });
});
