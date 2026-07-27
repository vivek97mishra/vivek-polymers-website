// ===== VIVEK POLYMERS - MAIN JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    // === Mobile Navigation Toggle ===
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            hamburger.classList.toggle('active');
            
            // Animate hamburger
            const spans = hamburger.querySelectorAll('span');
            if (hamburger.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
                spans[2].style.width = '24px';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                spans[2].style.width = '16px';
            }
        });
    }
    
    // === Navbar Scroll Effect ===
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.querySelector('.glass-nav').style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.querySelector('.glass-nav').style.background = 'rgba(15, 23, 42, 0.8)';
        }
    });

    // === Counter Animation ===
    const counters = document.querySelectorAll('[data-target]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
    
    // === Smooth Scroll for Anchor Links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    hamburger.classList.remove('active');
                }
            }
        });
    });

    // === Form Handling ===
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ef4444';
                } else {
                    input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }
            });
            
            if (isValid) {
                // Show success message
                const btn = form.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check mr-2"></i> Submitted Successfully!';
                btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    form.reset();
                }, 3000);
            }
        });
    });
    
    // === Product Filter Tabs ===
    const filterTabs = document.querySelectorAll('.filter-tab');
    const productCards = document.querySelectorAll('.product-detail-card');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            productCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // === Modal Handling ===
    const modal = document.getElementById('quoteModal');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    if (modal && modalClose && modalOverlay) {
        modalClose.addEventListener('click', () => modal.classList.add('hidden'));
        modalOverlay.addEventListener('click', () => modal.classList.add('hidden'));
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                modal.classList.add('hidden');
            }
        });
    }

    // === Intersection Observer for Animations ===
    const animatedElements = document.querySelectorAll('.product-card, .feature-item, .value-card, .infra-card, .quality-card, .contact-card');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                animationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(el);
    });
    
    // === Parallax Effect for Hero ===
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            const rate = scrolled * 0.3;
            heroSection.style.backgroundPositionY = rate + 'px';
        });
    }
    
    // === Active Navigation Link ===
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// === Fade In Animation Keyframe ===
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// === Preloader (optional) ===
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
