// Immediately load critical JS functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Lazy loading implementation
            const lazyLoad = (targets) => {
                const io = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            const src = img.getAttribute('data-src');
                            
                            if (src) {
                                img.src = src;
                                img.classList.add('loaded');
                                observer.unobserve(img);
                            }
                        }
                    });
                }, {
                    rootMargin: '0px 0px 100px 0px'
                });

                targets.forEach(img => {
                    io.observe(img);
                });
            };

            // Initialize lazy loading
            lazyLoad(document.querySelectorAll('.lazy'));

            // Mobile menu toggle
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const nav = document.getElementById('nav');
            
            mobileMenuBtn.addEventListener('click', () => {
                const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
                mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
                nav.setAttribute('aria-hidden', isExpanded);
                nav.classList.toggle('active');
                mobileMenuBtn.innerHTML = nav.classList.contains('active') ? 
                    '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            });

            // Close mobile menu when clicking on a nav link
            const navLinks = document.querySelectorAll('nav ul li a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    nav.setAttribute('aria-hidden', 'true');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                });
            });

            // Header scroll effect
            const header = document.getElementById('header');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });

            // Back to top button
            const backToTopBtn = document.getElementById('back-to-top');
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('show');
                } else {
                    backToTopBtn.classList.remove('show');
                }
            });

            backToTopBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            // Toast notification
            function showToast(message, type = 'success') {
                const toast = document.getElementById('toast');
                toast.innerHTML = `
                    <i class="fas fa-${type === 'success' ? 'check-circle' : 'times-circle'}"></i>
                    ${message.replace('$', 'Ksh')}
                `;
                toast.className = `toast ${type}`;
                toast.classList.add('show');
                
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            }

            // Logo re-animation on click
            const logos = document.querySelectorAll('.logo, .footer-logo');
            logos.forEach(logo => {
                logo.addEventListener('click', function(e) {
                    logo.classList.remove('logo-pop-animate');
                    void logo.offsetWidth; // trigger reflow
                    logo.classList.add('logo-pop-animate');
                });
            });
        });

        // Load remaining JS after page load
        window.addEventListener('load', function() {
            // Cart functionality
            const cartIcon = document.getElementById('cart-icon');
            const cartOverlay = document.getElementById('cart-overlay');
            const cartSidebar = document.getElementById('cart-sidebar');
            const closeCart = document.getElementById('close-cart');
            
            cartIcon.addEventListener('click', (e) => {
                e.preventDefault();
                cartOverlay.setAttribute('aria-hidden', 'false');
                cartSidebar.setAttribute('aria-hidden', 'false');
                cartOverlay.classList.add('active');
                cartSidebar.classList.add('active');
            });
            
            closeCart.addEventListener('click', () => {
                cartOverlay.setAttribute('aria-hidden', 'true');
                cartSidebar.setAttribute('aria-hidden', 'true');
                cartOverlay.classList.remove('active');
                cartSidebar.classList.remove('active');
            });
            
            cartOverlay.addEventListener('click', () => {
                cartOverlay.setAttribute('aria-hidden', 'true');
                cartSidebar.setAttribute('aria-hidden', 'true');
                cartOverlay.classList.remove('active');
                cartSidebar.classList.remove('active');
            });

            // Product Quick View
            const productCards = document.querySelectorAll('.product-card');
            const quickviewOverlay = document.getElementById('quickview-overlay');
            const quickviewModal = document.getElementById('quickview-modal');
            const closeQuickview = document.getElementById('close-quickview');
            
            productCards.forEach(card => {
                card.addEventListener('click', (e) => {
                    if (!e.target.closest('.add-to-cart')) {
                        quickviewOverlay.setAttribute('aria-hidden', 'false');
                        quickviewModal.setAttribute('aria-hidden', 'false');
                        quickviewOverlay.classList.add('active');
                        quickviewModal.showModal();
                        document.body.style.overflow = 'hidden';
                    }
                });
            });
            
            closeQuickview.addEventListener('click', () => {
                quickviewOverlay.setAttribute('aria-hidden', 'true');
                quickviewModal.setAttribute('aria-hidden', 'true');
                quickviewOverlay.classList.remove('active');
                quickviewModal.close();
                document.body.style.overflow = 'auto';
            });
            
            quickviewOverlay.addEventListener('click', (e) => {
                if (e.target === quickviewOverlay) {
                    quickviewOverlay.setAttribute('aria-hidden', 'true');
                    quickviewModal.setAttribute('aria-hidden', 'true');
                    quickviewOverlay.classList.remove('active');
                    quickviewModal.close();
                    document.body.style.overflow = 'auto';
                }
            });

            // Testimonials slider
            if (typeof Ksh !== 'undefined') {
                $('.testimonials-slider').slick({
                    dots: true,
                    infinite: true,
                    speed: 300,
                    slidesToShow: 1,
                    adaptiveHeight: true,
                    autoplay: true,
                    autoplaySpeed: 5000,
                    arrows: false,
                    accessibility: true
                });
            }

            // Animation on scroll
            const fadeElements = document.querySelectorAll('.fade-in');
            
            function checkScroll() {
                fadeElements.forEach(element => {
                    const elementTop = element.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    
                    if (elementTop < windowHeight - 100) {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }
                });
            }
            
            window.addEventListener('scroll', checkScroll);
            window.addEventListener('load', checkScroll);

            // Service worker registration for PWA
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/sw.js').then(registration => {
                        console.log('ServiceWorker registration successful');
                    }).catch(err => {
                        console.log('ServiceWorker registration failed: ', err);
                    });
                });
            }

            // WebP feature detection
            function checkWebPSupport(callback) {
                const webP = new Image();
                webP.onload = webP.onerror = function() {
                    callback(webP.height === 2);
                };
                webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
            }

            checkWebPSupport((isSupported) => {
                if (isSupported) {
                    document.documentElement.classList.add('webp');
                } else {
                    document.documentElement.classList.add('no-webp');
                }
            });

            // Save cart to localStorage
            function saveCartToStorage() {
                localStorage.setItem('pinkyCutiesCart', JSON.stringify(cart));
            }

            function loadCartFromStorage() {
                const savedCart = localStorage.getItem('pinkyCutiesCart');
                if (savedCart) {
                    cart = JSON.parse(savedCart);
                    updateCart();
                }
            }

            // Load cart when page loads
            loadCartFromStorage();
        });