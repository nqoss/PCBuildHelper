// Main JavaScript file for PC Build Recommendations site

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize tooltips if any exist
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Add fade-in animation to cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards for animation
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        observer.observe(card);
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Contact form handling
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name') || document.getElementById('name')?.value;
            const email = formData.get('email') || document.getElementById('email')?.value;
            const message = formData.get('message') || document.getElementById('message')?.value;
            
            // Basic validation
            if (!name || !email || !message) {
                showAlert('Please fill in all required fields.', 'warning');
                return;
            }
            
            if (!isValidEmail(email)) {
                showAlert('Please enter a valid email address.', 'warning');
                return;
            }
            
            // Simulate form submission (in real app, this would go to server)
            showAlert('Thank you for your message! I\'ll get back to you within 24-48 hours.', 'success');
            this.reset();
        });
    }

    // Newsletter signup handling
    const newsletterCheckbox = document.getElementById('newsletter');
    if (newsletterCheckbox) {
        newsletterCheckbox.addEventListener('change', function() {
            if (this.checked) {
                console.log('User subscribed to newsletter');
                // In real app, this would track newsletter signup
            }
        });
    }

    // Build category filtering (future enhancement)
    const buildCards = document.querySelectorAll('.card');
    
    // Add click tracking for build recommendations
    buildCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't track if clicking on buttons or links
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
                return;
            }
            
            const buildType = this.querySelector('.card-title')?.textContent || 'Unknown Build';
            console.log(`Build card clicked: ${buildType}`);
            // In real app, this would send analytics data
        });
    });

    // Add keyboard navigation for accessibility
    document.addEventListener('keydown', function(e) {
        // Press 'h' to go to homepage
        if (e.key === 'h' && !e.ctrlKey && !e.metaKey && !isTyping()) {
            window.location.href = '/';
        }
        
        // Press 'b' to go to builds page
        if (e.key === 'b' && !e.ctrlKey && !e.metaKey && !isTyping()) {
            window.location.href = '/builds';
        }
        
        // Press 'g' to go to guides page
        if (e.key === 'g' && !e.ctrlKey && !e.metaKey && !isTyping()) {
            window.location.href = '/guides';
        }
    });

    // Auto-hide alerts after 5 seconds
    setTimeout(() => {
        const alerts = document.querySelectorAll('.alert');
        alerts.forEach(alert => {
            if (alert.classList.contains('alert-success') || alert.classList.contains('alert-info')) {
                alert.style.transition = 'opacity 0.3s ease';
                alert.style.opacity = '0';
                setTimeout(() => alert.remove(), 300);
            }
        });
    }, 5000);

    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.now();
            console.log(`Page loaded in ${Math.round(loadTime)}ms`);
            
            // In real app, this would send performance metrics to analytics
            if (loadTime > 3000) {
                console.warn('Page load time is slow, consider optimization');
            }
        });
    }
});

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isTyping() {
    const activeElement = document.activeElement;
    return activeElement && (
        activeElement.tagName === 'INPUT' || 
        activeElement.tagName === 'TEXTAREA' || 
        activeElement.contentEditable === 'true'
    );
}

function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());
    
    // Create new alert
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '9999';
    alertDiv.style.minWidth = '300px';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.style.opacity = '0';
            setTimeout(() => alertDiv.remove(), 300);
        }
    }, 5000);
}

// Export functions for potential use in other scripts
window.PCBuildUtils = {
    isValidEmail,
    showAlert,
    isTyping
};

// Console message for developers
console.log('🖥️ PCBuildHelper - Built with passion for PC gaming!');
console.log('💡 Keyboard shortcuts: h=home, b=builds, g=guides');
