
        // Product Data with Rs.500 price
        const products = [
            {
                id: 1,
                name: "Eternal Romance Bouquet",
                price: 500,
                image: "1.jpeg",
                description: "A classic arrangement of red roses and white lilies, perfect for romantic occasions."
            },
            {
                id: 2,
                name: "Spring Bliss Arrangement",
                price: 500,
                image: "2.jpeg",
                description: "Bright sunflowers and yellow roses to bring cheer and happiness."
            },
            {
                id: 3,
                name: "Lavender Dream Bundle",
                price: 500,
                image: "3.jpeg",
                description: "Elegant purple orchids and lavender roses in a sophisticated arrangement."
            },
            {
                id: 4,
                name: "Sunshine & Daisies",
                price: 500,
                image: "4.jpg",
                description: "A vibrant mix of tulips, daisies, and peonies that captures spring essence."
            },
            {
                id: 5,
                name: "Royal Elegance Collection",
                price: 500,
                image: "5.jpeg",
                description: "White roses, lilies, and baby's breath for weddings and formal ceremonies."
            },
            {
                id: 6,
                name: "Tropical Paradise Bouquet",
                price: 500,
                image: "6.jpeg",
                description: "Exotic tropical flowers for a bold and vibrant statement."
            }
        ];
        
        // Cart Data
        let cart = JSON.parse(localStorage.getItem('flowerCart')) || [];
        
        // Admin Data
        const ADMIN_PASSWORD = "Tharu123";
        const GOOGLE_SHEET_ID = "1pJYIOwZNc0kK32pP2JMg6H4VEQFHSWYXPf_xxYSLYCQ";
        
        // DOM Elements
        const productGrid = document.getElementById('productGrid');
        const cartIcon = document.getElementById('cartIcon');
        const cartCount = document.getElementById('cartCount');
        const cartModal = document.getElementById('cartModal');
        const closeCart = document.getElementById('closeCart');
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        const checkoutBtn = document.getElementById('checkoutBtn');
        const contactForm = document.getElementById('contactForm');
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.getElementById('navMenu');
        
        // Theme Elements
        const themeToggle = document.getElementById('themeToggle');
        const themeOptions = document.getElementById('themeOptions');
        const themeButtons = document.querySelectorAll('.theme-option');
        
        // Admin Elements
        const adminBtn = document.getElementById('adminBtn');
        const adminModal = document.getElementById('adminModal');
        const closeAdmin = document.getElementById('closeAdmin');
        const adminPassword = document.getElementById('adminPassword');
        const loginBtn = document.getElementById('loginBtn');
        const adminLogin = document.getElementById('adminLogin');
        const adminDashboard = document.getElementById('adminDashboard');
        
        // Admin Dashboard Elements
        const totalOrders = document.getElementById('totalOrders');
        const totalRevenue = document.getElementById('totalRevenue');
        const totalCustomers = document.getElementById('totalCustomers');
        const totalMessages = document.getElementById('totalMessages');
        const submissionsBody = document.getElementById('submissionsBody');
        
        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            renderProducts();
            updateCartCount();
            createAnimatedBackground();
            
            // Mobile navigation toggle
            mobileToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                mobileToggle.querySelector('i').classList.toggle('fa-bars');
                mobileToggle.querySelector('i').classList.toggle('fa-times');
            });
            
            // Close mobile menu when clicking on a link
            document.querySelectorAll('#navMenu a').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    mobileToggle.querySelector('i').classList.remove('fa-times');
                    mobileToggle.querySelector('i').classList.add('fa-bars');
                });
            });
            
            // Cart toggle
            cartIcon.addEventListener('click', (e) => {
                e.preventDefault();
                cartModal.classList.add('open');
                renderCart();
            });
            
            closeCart.addEventListener('click', () => {
                cartModal.classList.remove('open');
            });
            
            // Close cart when clicking outside
            document.addEventListener('click', (e) => {
                if (!cartModal.contains(e.target) && !cartIcon.contains(e.target)) {
                    cartModal.classList.remove('open');
                }
            });
            
            // Contact form submission
            contactForm.addEventListener('submit', submitContactForm);
            
            // Checkout button
            checkoutBtn.addEventListener('click', checkoutViaWhatsApp);
            
            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    if(this.getAttribute('href') === '#') return;
                    
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if(targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Theme toggle functionality
            themeToggle.addEventListener('click', () => {
                themeOptions.classList.toggle('show');
            });
            
            // Close theme options when clicking outside
            document.addEventListener('click', (e) => {
                if (!themeToggle.contains(e.target) && !themeOptions.contains(e.target)) {
                    themeOptions.classList.remove('show');
                }
            });
            
            // Theme selection
            themeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const theme = button.getAttribute('data-theme');
                    setTheme(theme);
                    
                    // Update active button
                    themeButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    // Close options
                    themeOptions.classList.remove('show');
                });
            });
            
            // Admin functionality
            adminBtn.addEventListener('click', (e) => {
                e.preventDefault();
                adminModal.classList.add('active');
                adminLogin.classList.add('active');
                adminDashboard.classList.remove('active');
            });
            
            closeAdmin.addEventListener('click', () => {
                adminModal.classList.remove('active');
                adminPassword.value = '';
            });
            
            loginBtn.addEventListener('click', () => {
                const password = adminPassword.value;
                if (password === ADMIN_PASSWORD) {
                    adminLogin.classList.remove('active');
                    adminDashboard.classList.add('active');
                    loadAdminData();
                } else {
                    showNotification('Incorrect password!');
                }
            });
            
            // Close admin modal when clicking outside
            adminModal.addEventListener('click', (e) => {
                if (e.target === adminModal) {
                    adminModal.classList.remove('active');
                    adminPassword.value = '';
                }
            });
        });
        
        // Create animated background
        function createAnimatedBackground() {
            const bg = document.querySelector('.animated-bg');
            for (let i = 0; i < 15; i++) {
                const span = document.createElement('span');
                span.style.left = Math.random() * 100 + '%';
                span.style.width = Math.random() * 100 + 20 + 'px';
                span.style.height = span.style.width;
                span.style.animationDelay = Math.random() * 20 + 's';
                span.style.animationDuration = Math.random() * 20 + 20 + 's';
                bg.appendChild(span);
            }
        }
        
        // Set theme
        function setTheme(theme) {
            document.body.className = '';
            if (theme !== 'default') {
                document.body.classList.add(`theme-${theme}`);
            }
            localStorage.setItem('flowerTheme', theme);
        }
        
        // Load saved theme
        function loadTheme() {
            const savedTheme = localStorage.getItem('flowerTheme') || 'default';
            setTheme(savedTheme);
            
            // Update active button
            themeButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-theme') === savedTheme) {
                    btn.classList.add('active');
                }
            });
        }
        
        // Load theme on page load
        window.addEventListener('load', loadTheme);
        
        // Render products to the page
        function renderProducts() {
            productGrid.innerHTML = '';
            
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product-img">
                    <div class="product-content">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <div class="product-price">
                            <span class="price">Rs. ${product.price.toFixed(2)}</span>
                            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                        </div>
                    </div>
                `;
                
                productGrid.appendChild(productCard);
            });
            
            // Add event listeners to all "Add to Cart" buttons
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = parseInt(this.getAttribute('data-id'));
                    addToCart(productId);
                });
            });
        }
        
        // Add product to cart
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const cartItem = cart.find(item => item.id === productId);
            
            if (cartItem) {
                cartItem.quantity += 1;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                });
            }
            
            updateCartCount();
            saveCartToLocalStorage();
            
            // Show confirmation
            showNotification(`${product.name} added to cart!`);
        }
        
        // Remove item from cart
        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCartCount();
            saveCartToLocalStorage();
            renderCart();
            
            if (cart.length === 0) {
                setTimeout(() => {
                    cartModal.classList.remove('open');
                }, 500);
            }
        }
        
        // Update cart count display
        function updateCartCount() {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
        
        // Render cart items
        function renderCart() {
            if (cart.length === 0) {
                cartItems.innerHTML = '<p style="text-align: center; color: #bbb;">Your cart is empty</p>';
                cartTotal.textContent = 'Rs. 0';
                return;
            }
            
            let cartHTML = '';
            let total = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                cartHTML += `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-details">
                            <div class="cart-item-title">${item.name}</div>
                            <div class="cart-item-price">Rs. ${item.price.toFixed(2)} x ${item.quantity}</div>
                        </div>
                        <button class="remove-item" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
            });
            
            cartItems.innerHTML = cartHTML;
            cartTotal.textContent = `Rs. ${total.toFixed(2)}`;
            
            // Add event listeners to remove buttons
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = parseInt(this.getAttribute('data-id'));
                    removeFromCart(productId);
                });
            });
        }
        
        // Checkout via WhatsApp
        function checkoutViaWhatsApp() {
            if (cart.length === 0) {
                showNotification('Your cart is empty!');
                return;
            }
            
            let message = "Hello DECORATIVE FLOWERS! I'd like to order the following flower bouquets:%0A%0A";
            
            let total = 0;
            cart.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                message += `${index + 1}. ${item.name} - Rs. ${item.price.toFixed(2)} x ${item.quantity} = Rs. ${itemTotal.toFixed(2)}%0A`;
            });
            
            message += `%0ATotal: Rs. ${total.toFixed(2)}%0A%0APlease contact me to confirm the order and delivery details.`;
            
            // WhatsApp number
            const phoneNumber = "94760276945";
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
            
            window.open(whatsappURL, '_blank');
            
            // Save order locally
            saveOrderToLocalStorage(total);
            
            // Clear cart after order
            cart = [];
            updateCartCount();
            saveCartToLocalStorage();
            renderCart();
            
            setTimeout(() => {
                cartModal.classList.remove('open');
                showNotification('Order sent via WhatsApp!');
            }, 1000);
        }
        
        // Submit contact form to Google Sheets
        async function submitContactForm(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Prepare data for Google Sheets
            const formData = {
                name: name,
                email: email,
                phone: phone,
                message: message,
                timestamp: new Date().toISOString()
            };
            
            try {
                // Replace with your Google Apps Script Web App URL
                const googleScriptURL = "https://script.google.com/macros/s/AKfycbw_bXv8WJ-P8__w7ZbbI1yAiyR1sIJRBcaESvh9RHzACUSAezx4gzYS3cFc69vbFiCe/exec";
                
                // Send data to Google Sheets via Apps Script
                const response = await fetch(googleScriptURL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                // Save form data locally
                saveFormDataLocally(formData);
                
                showNotification('Thank you! Your message has been sent successfully.');
                
                // Reset form
                contactForm.reset();
                
            } catch (error) {
                console.error('Error:', error);
                
                // Save form data locally as fallback
                saveFormDataLocally(formData);
                
                showNotification('Message sent! (Form data saved locally)');
                
                // Reset form
                contactForm.reset();
            }
        }
        
        // Load admin data
        async function loadAdminData() {
            try {
                // Load from Google Sheets
                const sheetURL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:json`;
                const response = await fetch(sheetURL);
                const text = await response.text();
                const json = JSON.parse(text.substring(47, text.length - 2));
                
                // Process data
                const rows = json.table.rows;
                const submissions = [];
                
                rows.forEach(row => {
                    const cells = row.c;
                    if (cells && cells.length >= 4) {
                        submissions.push({
                            date: cells[0] ? cells[0].v : '',
                            name: cells[1] ? cells[1].v : '',
                            email: cells[2] ? cells[2].v : '',
                            phone: cells[3] ? cells[3].v : '',
                            message: cells[4] ? cells[4].v : ''
                        });
                    }
                });
                
                // Update dashboard
                updateDashboard(submissions);
                
            } catch (error) {
                console.error('Error loading Google Sheet:', error);
                // Fallback to local storage
                loadLocalAdminData();
            }
        }
        
        // Load admin data from local storage
        function loadLocalAdminData() {
            const submissions = JSON.parse(localStorage.getItem('contactForms')) || [];
            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            
            updateDashboard(submissions, orders);
        }
        
        // Update admin dashboard
        function updateDashboard(submissions, orders = []) {
            // Update stats
            totalMessages.textContent = submissions.length;
            totalCustomers.textContent = new Set(submissions.map(s => s.email)).size;
            
            // Calculate orders and revenue from local storage
            const localOrders = JSON.parse(localStorage.getItem('orders')) || [];
            totalOrders.textContent = localOrders.length;
            
            const totalRevenueValue = localOrders.reduce((sum, order) => sum + order.total, 0);
            totalRevenue.textContent = `Rs. ${totalRevenueValue}`;
            
            // Update submissions table
            submissionsBody.innerHTML = '';
            submissions.forEach(submission => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${new Date(submission.date).toLocaleDateString()}</td>
                    <td>${submission.name || ''}</td>
                    <td>${submission.email || ''}</td>
                    <td>${submission.phone || ''}</td>
                    <td>${submission.message || ''}</td>
                `;
                submissionsBody.appendChild(row);
            });
        }
        
        // Save form data to local storage
        function saveFormDataLocally(formData) {
            let savedForms = JSON.parse(localStorage.getItem('contactForms')) || [];
            savedForms.push(formData);
            localStorage.setItem('contactForms', JSON.stringify(savedForms));
        }
        
        // Save order to local storage
        function saveOrderToLocalStorage(total) {
            let savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
            savedOrders.push({
                id: Date.now(),
                items: cart,
                total: total,
                date: new Date().toISOString()
            });
            localStorage.setItem('orders', JSON.stringify(savedOrders));
        }
        
        // Save cart to local storage
        function saveCartToLocalStorage() {
            localStorage.setItem('flowerCart', JSON.stringify(cart));
        }
        
        // Show notification
        function showNotification(message) {
            // Remove existing notifications
            document.querySelectorAll('.notification').forEach(notification => {
                document.body.removeChild(notification);
            });
            
            // Create notification element
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            // Animate in
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 10);
            
            // Animate out after 3 seconds
            setTimeout(() => {
                notification.style.transform = 'translateX(150%)';
                setTimeout(() => {
                    if(document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 400);
            }, 3000);
        }
