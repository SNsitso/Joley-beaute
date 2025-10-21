document.addEventListener('DOMContentLoaded', function() {
    // Menu Toggle for Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Image Carousel
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (carousel && carouselItems.length > 0) {
        let currentIndex = 0;
        
        // Function to update carousel position
        function updateCarousel() {
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        
        // Previous button click
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex === 0) ? carouselItems.length - 1 : currentIndex - 1;
                updateCarousel();
            });
        }
        
        // Next button click
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex === carouselItems.length - 1) ? 0 : currentIndex + 1;
                updateCarousel();
            });
        }
        
        // Auto slide every 5 seconds
        setInterval(() => {
            currentIndex = (currentIndex === carouselItems.length - 1) ? 0 : currentIndex + 1;
            updateCarousel();
        }, 5000);
    }
    
    // Smooth scrolling for anchor links
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
    
    // Sticky header on scroll
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Form validation for contact page
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            if (name && name.value.trim() === '') {
                isValid = false;
                showError(name, 'Veuillez entrer votre nom');
            } else if (name) {
                removeError(name);
            }
            
            if (email && email.value.trim() === '') {
                isValid = false;
                showError(email, 'Veuillez entrer votre email');
            } else if (email && !isValidEmail(email.value)) {
                isValid = false;
                showError(email, 'Veuillez entrer un email valide');
            } else if (email) {
                removeError(email);
            }
            
            if (message && message.value.trim() === '') {
                isValid = false;
                showError(message, 'Veuillez entrer votre message');
            } else if (message) {
                removeError(message);
            }
            
            if (isValid) {
                // Here you would typically send the form data to a server
                // For now, we'll just show a success message
                const formContainer = document.querySelector('.form-container');
                if (formContainer) {
                    formContainer.innerHTML = `
                        <div class="success-message">
                            <h3>Merci pour votre message!</h3>
                            <p>Nous vous répondrons dans les plus brefs délais.</p>
                        </div>
                    `;
                }
            }
        });
    }
    
    function showError(input, message) {
        const formControl = input.parentElement;
        const errorElement = formControl.querySelector('.error-message') || document.createElement('small');
        
        if (!formControl.querySelector('.error-message')) {
            errorElement.classList.add('error-message');
            formControl.appendChild(errorElement);
        }
        
        errorElement.innerText = message;
        formControl.classList.add('error');
    }
    
    function removeError(input) {
        const formControl = input.parentElement;
        formControl.classList.remove('error');
        
        const errorElement = formControl.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});
