let isScrolling = false;
let scrollTimeout;
let lastScrollTop = 0;
let animationFrame;

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

document.getElementById('mobile-menu-button').addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const menu = document.getElementById('mobile-menu');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    
    const isOpen = menu.classList.contains('show');
    
    if (isOpen) {
        menu.classList.remove('show');
        hamburgerIcon.classList.remove('active');
        
        requestAnimationFrame(() => {
            const menuItems = menu.querySelectorAll('.mobile-menu-item');
            menuItems.forEach((item, index) => {
                item.style.transform = 'translateY(-10px)';
                item.style.opacity = '0';
                item.style.transitionDelay = `${index * 30}ms`;
            });
        });
    } else {
        menu.classList.add('show');
        hamburgerIcon.classList.add('active');
        
        requestAnimationFrame(() => {
            const menuItems = menu.querySelectorAll('.mobile-menu-item');
            menuItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = 'translateY(0)';
                    item.style.opacity = '1';
                    item.style.transitionDelay = `${index * 40}ms`;
                }, 50);
            });
        });
    }
}, { passive: false });

document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', function(e) {
        const menu = document.getElementById('mobile-menu');
        const hamburgerIcon = document.getElementById('hamburger-icon');
        
        menu.classList.remove('show');
        hamburgerIcon.classList.remove('active');
        
        requestAnimationFrame(() => {
            const menuItems = menu.querySelectorAll('.mobile-menu-item');
            menuItems.forEach(item => {
                item.style.transform = 'translateY(-10px)';
                item.style.opacity = '0';
            });
        });
    }, { passive: false });
});

document.addEventListener('click', function(event) {
    const menu = document.getElementById('mobile-menu');
    const menuButton = document.getElementById('mobile-menu-button');
    
    if (menu.classList.contains('show') && 
        !menu.contains(event.target) && 
        !menuButton.contains(event.target)) {
        
        const hamburgerIcon = document.getElementById('hamburger-icon');
        menu.classList.remove('show');
        hamburgerIcon.classList.remove('active');
        
        requestAnimationFrame(() => {
            const menuItems = menu.querySelectorAll('.mobile-menu-item');
            menuItems.forEach(item => {
                item.style.transform = 'translateY(-10px)';
                item.style.opacity = '0';
            });
        });
    }
}, { passive: true });

const handleResize = debounce(function() {
    if (window.innerWidth >= 768) {
        const menu = document.getElementById('mobile-menu');
        const hamburgerIcon = document.getElementById('hamburger-icon');
        
        if (menu.classList.contains('show')) {
            menu.classList.remove('show');
            hamburgerIcon.classList.remove('active');
        }
    }
}, 250);

window.addEventListener('resize', handleResize, { passive: true });

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        const navbar = document.querySelector('nav');
        const mobileMenu = document.getElementById('mobile-menu');
        const hamburgerIcon = document.getElementById('hamburger-icon');

        if (navbar) {
            navbar.style.transform = 'translateY(0)';
        }
        
        if (mobileMenu && mobileMenu.classList.contains('show')) {
            mobileMenu.classList.remove('show');
            if (hamburgerIcon) hamburgerIcon.classList.remove('active');
        }

        const targetPosition = targetElement.offsetTop - 70;

        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        } else {
            let start = window.pageYOffset;
            let distance = targetPosition - start;
            let duration = 800;
            let startTime = null;
            
            function scrollAnimation(currentTime) {
                if (startTime === null) startTime = currentTime;
                let timeElapsed = currentTime - startTime;
                let run = easeInOutQuad(timeElapsed, start, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(scrollAnimation);
            }
            
            function easeInOutQuad(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }
            
            requestAnimationFrame(scrollAnimation);
        }
    }, { passive: false });
});

const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            animationObserver.unobserve(element);
        }
    });
}, observerOptions);

function initializeAnimations() {
    const slideUpElements = document.querySelectorAll('.slide-up');
    const fadeInElements = document.querySelectorAll('.fade-in');
    
    slideUpElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        animationObserver.observe(el);
    });
    
    fadeInElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.8s ease';
        animationObserver.observe(el);
    });
}

const handleScroll = throttle(function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const navbar = document.querySelector('nav');
    const mobileMenu = document.getElementById('mobile-menu');
    const backToTopButton = document.getElementById('back-to-top');
    
    if (mobileMenu && mobileMenu.classList.contains('show')) {
        if (navbar) navbar.style.transform = 'translateY(0)';
        return;
    }
    
    if (navbar && scrollTop > 100) {
        if (scrollTop > lastScrollTop + 10) {
            if (window.innerWidth >= 768 || !mobileMenu.classList.contains('show')) {
                navbar.style.transform = 'translateY(-100%)';
            }
        } else if (lastScrollTop - scrollTop > 10) {
            navbar.style.transform = 'translateY(0)';
        }
    } else if (navbar) {
        navbar.style.transform = 'translateY(0)';
    }

    if (backToTopButton) {
        if (scrollTop > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100', 'visible');
        } else {
            backToTopButton.classList.remove('opacity-100', 'visible');
            backToTopButton.classList.add('opacity-0', 'invisible');
        }
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, 16);

window.addEventListener('scroll', handleScroll, { passive: true });

document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('back-to-top');
    const navbar = document.querySelector('nav');
    
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();

            if (navbar) {
                navbar.style.transform = 'translateY(0)';
            }
            
            if ('scrollBehavior' in document.documentElement.style) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                let startPosition = window.pageYOffset;
                let startTime = null;
                const duration = 600;
                
                function scrollToTop(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const progress = Math.min(timeElapsed / duration, 1);
                    
                    const easeProgress = progress < 0.5 
                        ? 2 * progress * progress 
                        : -1 + (4 - 2 * progress) * progress;
                    
                    window.scrollTo(0, startPosition * (1 - easeProgress));
                    
                    if (timeElapsed < duration) {
                        requestAnimationFrame(scrollToTop);
                    }
                }
                
                requestAnimationFrame(scrollToTop);
            }
        }, { passive: false });
    }
    
    initializeAnimations();
});

window.addEventListener('beforeunload', function() {
    if (animationObserver) {
        animationObserver.disconnect();
    }
    
    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
    }
    
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
});

let touchStartY = 0;
let touchStartTime = 0;

document.addEventListener('touchstart', function(e) {
    touchStartY = e.touches[0].clientY;
    touchStartTime = Date.now();
}, { passive: true });

document.addEventListener('touchmove', function(e) {
    if (Math.abs(e.touches[0].clientY - touchStartY) > 10 && Date.now() - touchStartTime < 500) {
        const isAtTop = window.scrollY <= 0;
        const isAtBottom = window.scrollY >= document.documentElement.scrollHeight - window.innerHeight;
        
        if ((isAtTop && e.touches[0].clientY > touchStartY) || 
            (isAtBottom && e.touches[0].clientY < touchStartY)) {
            e.preventDefault();
        }
    }
}, { passive: false });

if (window.performance && console.log) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = window.performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
        }, 0);
    });
}
