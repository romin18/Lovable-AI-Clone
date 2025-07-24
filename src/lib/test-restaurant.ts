export const testRestaurantHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bella Vista Restaurant - Authentic Italian Cuisine</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Georgia', serif;
            line-height: 1.6;
            color: #333;
            overflow-x: hidden;
        }
        
        /* Hero Section */
        .hero {
            height: 100vh;
            background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
                        radial-gradient(circle at center, #8B4513 0%, #654321 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: white;
            position: relative;
        }
        
        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="30" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="70" r="1.5" fill="rgba(255,255,255,0.1)"/></svg>');
            animation: sparkle 3s ease-in-out infinite;
        }
        
        @keyframes sparkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.8; }
        }
        
        .hero-content h1 {
            font-size: 4rem;
            margin-bottom: 1rem;
            animation: fadeInUp 1s ease;
        }
        
        .hero-content p {
            font-size: 1.5rem;
            margin-bottom: 2rem;
            animation: fadeInUp 1s ease 0.3s both;
        }
        
        .cta-button {
            background: linear-gradient(45deg, #ff6b35, #f7931e);
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: bold;
            display: inline-block;
            transition: all 0.3s ease;
            animation: fadeInUp 1s ease 0.6s both;
            box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
        }
        
        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Navigation */
        .navbar {
            position: fixed;
            top: 0;
            width: 100%;
            background: rgba(0,0,0,0.9);
            z-index: 1000;
            padding: 1rem 5%;
            transition: all 0.3s ease;
        }
        
        .navbar.scrolled {
            background: rgba(0,0,0,0.95);
            backdrop-filter: blur(10px);
        }
        
        .nav-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .logo {
            color: #ff6b35;
            font-size: 1.8rem;
            font-weight: bold;
        }
        
        .nav-links {
            display: flex;
            list-style: none;
            gap: 2rem;
        }
        
        .nav-links a {
            color: white;
            text-decoration: none;
            transition: color 0.3s ease;
        }
        
        .nav-links a:hover {
            color: #ff6b35;
        }
        
        /* Menu Section */
        .menu-section {
            padding: 5rem 5%;
            background: linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 100%);
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .section-title {
            text-align: center;
            font-size: 3rem;
            margin-bottom: 3rem;
            color: #333;
            position: relative;
        }
        
        .section-title::after {
            content: '';
            width: 100px;
            height: 3px;
            background: linear-gradient(45deg, #ff6b35, #f7931e);
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
        }
        
        .menu-categories {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 3rem;
            flex-wrap: wrap;
        }
        
        .category-btn {
            padding: 10px 20px;
            background: white;
            border: 2px solid #ff6b35;
            color: #ff6b35;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: bold;
        }
        
        .category-btn.active,
        .category-btn:hover {
            background: #ff6b35;
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(255, 107, 53, 0.3);
        }
        
        .menu-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
        }
        
        .menu-item {
            background: white;
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            border-left: 4px solid #ff6b35;
        }
        
        .menu-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }
        
        .menu-item h3 {
            color: #333;
            margin-bottom: 0.5rem;
            font-size: 1.3rem;
        }
        
        .menu-item .price {
            color: #ff6b35;
            font-weight: bold;
            font-size: 1.2rem;
            float: right;
        }
        
        .menu-item p {
            color: #666;
            margin-top: 0.5rem;
            clear: both;
        }
        
        /* About Section */
        .about-section {
            padding: 5rem 5%;
            background: white;
        }
        
        .about-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            align-items: center;
        }
        
        .about-text h2 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            color: #333;
        }
        
        .about-text p {
            font-size: 1.1rem;
            margin-bottom: 1rem;
            color: #666;
        }
        
        .about-image {
            height: 400px;
            background: linear-gradient(45deg, #ff6b35, #f7931e);
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 3rem;
            position: relative;
            overflow: hidden;
        }
        
        .about-image::before {
            content: '🍝';
            font-size: 8rem;
            opacity: 0.3;
            position: absolute;
        }
        
        /* Reservation Section */
        .reservation-section {
            padding: 5rem 5%;
            background: linear-gradient(135deg, #333 0%, #222 100%);
            color: white;
        }
        
        .reservation-form {
            max-width: 600px;
            margin: 0 auto;
            background: rgba(255,255,255,0.1);
            padding: 3rem;
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: #ff6b35;
            font-weight: bold;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 12px;
            border: none;
            border-radius: 8px;
            background: rgba(255,255,255,0.9);
            font-size: 1rem;
        }
        
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }
        
        .submit-btn {
            background: linear-gradient(45deg, #ff6b35, #f7931e);
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 8px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            width: 100%;
            transition: all 0.3s ease;
        }
        
        .submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
        }
        
        /* Footer */
        .footer {
            background: #222;
            color: white;
            padding: 3rem 5%;
            text-align: center;
        }
        
        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .footer-section h3 {
            color: #ff6b35;
            margin-bottom: 1rem;
        }
        
        .footer-section p {
            margin-bottom: 0.5rem;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .hero-content h1 {
                font-size: 2.5rem;
            }
            
            .nav-links {
                display: none;
            }
            
            .about-content {
                grid-template-columns: 1fr;
            }
            
            .form-row {
                grid-template-columns: 1fr;
            }
            
            .menu-grid {
                grid-template-columns: 1fr;
            }
        }
        
        /* Loading Animation */
        .loading {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #333;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        
        .loading.hidden {
            opacity: 0;
            pointer-events: none;
        }
        
        .spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255, 107, 53, 0.3);
            border-top: 3px solid #ff6b35;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="loading" id="loading">
        <div class="spinner"></div>
    </div>

    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <div class="logo">🍝 Bella Vista</div>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#menu">Menu</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#reservation">Reservations</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
    </nav>

    <section class="hero" id="home">
        <div class="hero-content">
            <h1>Bella Vista Restaurant</h1>
            <p>Authentic Italian Cuisine Since 1952</p>
            <a href="#menu" class="cta-button">Explore Our Menu</a>
        </div>
    </section>

    <section class="menu-section" id="menu">
        <div class="container">
            <h2 class="section-title">Our Delicious Menu</h2>
            
            <div class="menu-categories">
                <button class="category-btn active" onclick="showCategory('appetizers')">Appetizers</button>
                <button class="category-btn" onclick="showCategory('pasta')">Pasta</button>
                <button class="category-btn" onclick="showCategory('mains')">Main Courses</button>
                <button class="category-btn" onclick="showCategory('desserts')">Desserts</button>
            </div>
            
            <div class="menu-grid" id="menuGrid">
                <!-- Menu items will be populated by JavaScript -->
            </div>
        </div>
    </section>

    <section class="about-section" id="about">
        <div class="container">
            <div class="about-content">
                <div class="about-text">
                    <h2>Our Story</h2>
                    <p>Founded in 1952 by the Rossi family, Bella Vista has been serving authentic Italian cuisine for over 70 years. Our recipes have been passed down through generations, bringing you the true taste of Italy.</p>
                    <p>We source our ingredients from local farms and import specialty items directly from Italy to ensure the highest quality and authenticity in every dish.</p>
                    <p>Join us for an unforgettable dining experience where tradition meets innovation in the heart of the city.</p>
                </div>
                <div class="about-image">
                    <span>Our Kitchen</span>
                </div>
            </div>
        </div>
    </section>

    <section class="reservation-section" id="reservation">
        <div class="container">
            <h2 class="section-title" style="color: white;">Make a Reservation</h2>
            
            <form class="reservation-form" id="reservationForm">
                <div class="form-row">
                    <div class="form-group">
                        <label for="name">Full Name</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="date">Date</label>
                        <input type="date" id="date" name="date" required>
                    </div>
                    <div class="form-group">
                        <label for="time">Time</label>
                        <select id="time" name="time" required>
                            <option value="">Select Time</option>
                            <option value="17:00">5:00 PM</option>
                            <option value="17:30">5:30 PM</option>
                            <option value="18:00">6:00 PM</option>
                            <option value="18:30">6:30 PM</option>
                            <option value="19:00">7:00 PM</option>
                            <option value="19:30">7:30 PM</option>
                            <option value="20:00">8:00 PM</option>
                            <option value="20:30">8:30 PM</option>
                            <option value="21:00">9:00 PM</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="guests">Number of Guests</label>
                        <select id="guests" name="guests" required>
                            <option value="">Select</option>
                            <option value="1">1 Guest</option>
                            <option value="2">2 Guests</option>
                            <option value="3">3 Guests</option>
                            <option value="4">4 Guests</option>
                            <option value="5">5 Guests</option>
                            <option value="6">6 Guests</option>
                            <option value="7">7 Guests</option>
                            <option value="8">8+ Guests</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="requests">Special Requests</label>
                    <textarea id="requests" name="requests" rows="3" placeholder="Any special dietary requirements or requests..."></textarea>
                </div>
                
                <button type="submit" class="submit-btn">Make Reservation</button>
            </form>
        </div>
    </section>

    <footer class="footer" id="contact">
        <div class="footer-content">
            <div class="footer-section">
                <h3>Contact Us</h3>
                <p>📍 123 Italian Street, City Center</p>
                <p>📞 (555) 123-4567</p>
                <p>✉️ info@bellavista.com</p>
            </div>
            <div class="footer-section">
                <h3>Opening Hours</h3>
                <p>Monday - Thursday: 5:00 PM - 10:00 PM</p>
                <p>Friday - Saturday: 5:00 PM - 11:00 PM</p>
                <p>Sunday: 4:00 PM - 9:00 PM</p>
            </div>
            <div class="footer-section">
                <h3>Follow Us</h3>
                <p>🌐 Facebook | Instagram | Twitter</p>
                <p>💌 Newsletter Signup Available</p>
                <p>⭐ Reviews on Google & Yelp</p>
            </div>
        </div>
    </footer>

    <script>
        console.log('=== RESTAURANT WEBSITE SCRIPT START ===');
        
        // Menu data
        const menuData = {
            appetizers: [
                { name: 'Bruschetta Classica', price: '$12', description: 'Grilled bread topped with fresh tomatoes, basil, and garlic' },
                { name: 'Antipasto Platter', price: '$18', description: 'Selection of cured meats, cheeses, olives, and marinated vegetables' },
                { name: 'Calamari Fritti', price: '$15', description: 'Crispy fried squid rings served with marinara sauce' },
                { name: 'Caprese Salad', price: '$14', description: 'Fresh mozzarella, tomatoes, and basil with balsamic reduction' }
            ],
            pasta: [
                { name: 'Spaghetti Carbonara', price: '$22', description: 'Classic Roman pasta with eggs, cheese, pancetta, and black pepper' },
                { name: 'Fettuccine Alfredo', price: '$20', description: 'Rich and creamy pasta with parmesan cheese and butter' },
                { name: 'Penne Arrabbiata', price: '$18', description: 'Spicy tomato sauce with garlic, chili, and fresh herbs' },
                { name: 'Lasagna della Casa', price: '$24', description: 'Layered pasta with meat sauce, ricotta, and mozzarella cheese' }
            ],
            mains: [
                { name: 'Osso Buco', price: '$32', description: 'Braised veal shanks in rich tomato and wine sauce' },
                { name: 'Chicken Parmigiana', price: '$26', description: 'Breaded chicken breast topped with marinara and mozzarella' },
                { name: 'Grilled Branzino', price: '$28', description: 'Mediterranean sea bass with lemon, herbs, and olive oil' },
                { name: 'Veal Scallopini', price: '$30', description: 'Tender veal in white wine and mushroom sauce' }
            ],
            desserts: [
                { name: 'Tiramisu', price: '$10', description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone' },
                { name: 'Panna Cotta', price: '$9', description: 'Silky vanilla custard topped with berry compote' },
                { name: 'Cannoli Siciliani', price: '$8', description: 'Crispy shells filled with sweet ricotta and chocolate chips' },
                { name: 'Gelato Selection', price: '$7', description: 'Three scoops of house-made Italian gelato' }
            ]
        };
        
        // Current category
        let currentCategory = 'appetizers';
        
        // DOM elements
        const navbar = document.getElementById('navbar');
        const menuGrid = document.getElementById('menuGrid');
        const reservationForm = document.getElementById('reservationForm');
        const loading = document.getElementById('loading');
        
        // Show category function
        function showCategory(category) {
            console.log('Showing category:', category);
            currentCategory = category;
            
            // Update active button
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // Clear menu grid
            menuGrid.innerHTML = '';
            
            // Add menu items with animation
            const items = menuData[category];
            items.forEach((item, index) => {
                setTimeout(() => {
                    const menuItem = document.createElement('div');
                    menuItem.className = 'menu-item';
                    menuItem.style.opacity = '0';
                    menuItem.style.transform = 'translateY(20px)';
                    
                    menuItem.innerHTML = \`
                        <h3>\${item.name} <span class="price">\${item.price}</span></h3>
                        <p>\${item.description}</p>
                    \`;
                    
                    menuGrid.appendChild(menuItem);
                    
                    // Animate in
                    setTimeout(() => {
                        menuItem.style.transition = 'all 0.5s ease';
                        menuItem.style.opacity = '1';
                        menuItem.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 100);
            });
        }
        
        // Smooth scrolling for navigation links
        function initSmoothScrolling() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }
        
        // Navbar scroll effect
        function initNavbarScroll() {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }
        
        // Form submission
        function initFormSubmission() {
            reservationForm.addEventListener('submit', function(e) {
                e.preventDefault();
                console.log('Form submitted');
                
                // Get form data
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);
                
                console.log('Reservation data:', data);
                
                // Simulate form submission
                const submitBtn = this.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Processing...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert(\`Thank you, \${data.name}! Your reservation for \${data.guests} guests on \${data.date} at \${data.time} has been confirmed. We'll send a confirmation email to \${data.email}.\`);
                    
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    this.reset();
                }, 2000);
            });
        }
        
        // Set minimum date for reservation
        function initDateRestriction() {
            const dateInput = document.getElementById('date');
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            
            dateInput.min = tomorrow.toISOString().split('T')[0];
        }
        
        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            console.log('=== RESTAURANT DOM LOADED ===');
            
            // Hide loading screen
            setTimeout(() => {
                loading.classList.add('hidden');
            }, 1000);
            
            // Initialize all functionality
            showCategory('appetizers');
            initSmoothScrolling();
            initNavbarScroll();
            initFormSubmission();
            initDateRestriction();
            
            console.log('Restaurant website initialized successfully');
        });
        
        // Make showCategory globally accessible
        window.showCategory = showCategory;
        
        console.log('=== RESTAURANT WEBSITE SCRIPT END ===');
    </script>
</body>
</html>` 