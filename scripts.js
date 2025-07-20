 // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const closeMenu = document.getElementById('closeMenu');
        const mainNav = document.getElementById('mainNav');
        
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        closeMenu.addEventListener('click', () => {
            mainNav.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Shopping Cart Toggle
        const cartIcon = document.getElementById('cartIcon');
        const closeCart = document.getElementById('closeCart');
        const cartSidebar = document.getElementById('cartSidebar');
        const overlay = document.getElementById('overlay');
        
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            cartSidebar.classList.add('open');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        closeCart.addEventListener('click', () => {
            cartSidebar.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        overlay.addEventListener('click', () => {
            cartSidebar.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Quick View Modal
        const quickViewBtns = document.querySelectorAll('.quick-view');
        const closeModal = document.getElementById('closeModal');
        const quickViewModal = document.getElementById('quickViewModal');
        
        quickViewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                quickViewModal.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        closeModal.addEventListener('click', () => {
            quickViewModal.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Thumbnail image change
        const thumbnails = document.querySelectorAll('.modal-thumbnail');
        const mainProductImage = document.getElementById('mainProductImage');
        
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                thumbnails.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
                const newImage = thumb.getAttribute('data-image');
                mainProductImage.src = newImage;
            });
        });
        
        // Quantity buttons in cart
        const minusBtns = document.querySelectorAll('.quantity-btn.minus');
        const plusBtns = document.querySelectorAll('.quantity-btn.plus');
        const quantityInputs = document.querySelectorAll('.quantity-input');
        
        minusBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                let value = parseInt(quantityInputs[index].value);
                if (value > 1) {
                    quantityInputs[index].value = value - 1;
                }
            });
        });
        
        plusBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                let value = parseInt(quantityInputs[index].value);
                quantityInputs[index].value = value + 1;
            });
        });
        
        // Remove item from cart
        const removeItems = document.querySelectorAll('.remove-item');
        
        removeItems.forEach(item => {
            item.addEventListener('click', function() {
                this.closest('.cart-item').style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    this.closest('.cart-item').remove();
                    updateCartTotal();
                }, 300);
            });
        });
        
        // Update cart total
        function updateCartTotal() {
            // In a real implementation, this would calculate the total
            console.log('Cart total updated');
        }
        
        // Add to cart buttons
        const addToCartBtns = document.querySelectorAll('.add-to-cart');
        const addToCartModal = document.getElementById('addToCartModal');
        const cartCount = document.querySelector('.cart-count');
        
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                let count = parseInt(cartCount.textContent);
                cartCount.textContent = count + 1;
                cartCount.style.animation = 'none';
                void cartCount.offsetWidth; // Trigger reflow
                cartCount.style.animation = 'pulse 0.5s ease';
                
                const productCard = this.closest('.product-card');
                const productName = productCard.querySelector('h3').textContent;
                const productPrice = productCard.querySelector('.price').textContent;
                const productImage = productCard.querySelector('.product-img img').src;
                
                // In a real implementation, you would add the product to the cart
                alert(`${productName} added to your luxury cart!`);
            });
        });
        
        addToCartModal.addEventListener('click', () => {
            let count = parseInt(cartCount.textContent);
            cartCount.textContent = count + 1;
            cartCount.style.animation = 'none';
            void cartCount.offsetWidth; // Trigger reflow
            cartCount.style.animation = 'pulse 0.5s ease';
            
            const productName = document.querySelector('.modal-product-info h2').textContent;
            alert(`${productName} added to your luxury cart!`);
            
            quickViewModal.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Wishlist buttons
        const wishlistBtns = document.querySelectorAll('.add-to-wishlist, .btn-outline');
        
        wishlistBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const icon = this.querySelector('i');
                if (icon.classList.contains('far')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    icon.style.color = 'var(--secondary-pink)';
                    icon.style.animation = 'pulse 0.5s ease';
                    alert('Added to your luxury wishlist!');
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    icon.style.color = '';
                    alert('Removed from your luxury wishlist!');
                }
            });
        });
        
        // Newsletter form
        const newsletterForm = document.getElementById('newsletterForm');
        
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            alert(`Thank you for joining our luxury circle with ${email}! You'll receive our next exclusive newsletter soon.`);
            this.querySelector('input').value = '';
        });
        
        // Product filtering
        const filterBtns = document.querySelectorAll('.filter-btn');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                const products = document.querySelectorAll('.product-card');
                
                products.forEach(product => {
                    if (filter === 'all' || product.getAttribute('data-category') === filter) {
                        product.style.display = 'block';
                        product.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        product.style.display = 'none';
                    }
                });
            });
        });
        
        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('mainHeader');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Testimonial slider - simple version
        let currentTestimonial = 0;
        const testimonials = document.querySelectorAll('.testimonial-slide');
        
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.display = i === index ? 'block' : 'none';
            });
        }
        
        // Initialize first testimonial
        showTestimonial(0);
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 8000);
        
        // Animate couple bracelets on scroll
        window.addEventListener('scroll', function() {
            const coupleSection = document.getElementById('coupleBracelets');
            const rect = coupleSection.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight) && (rect.bottom >= 0);
            
            if (isVisible) {
                document.querySelector('.bracelet-pinky').style.animation = 'float 6s ease-in-out infinite';
                document.querySelector('.bracelet-sanin').style.animation = 'float 6s ease-in-out infinite 2s';
            }
        });