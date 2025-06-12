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

// PC Building Guides Content
const guides = {
    firstTime: {
        title: "First Time Builder's Complete Guide",
        content: `
            <div class="guide-content">
                <h3>🔧 First Time PC Builder's Complete Guide</h3>
                <p class="lead">Building your first PC can seem overwhelming, but with proper preparation and patience, it's an incredibly rewarding experience. This guide will walk you through every step.</p>
                
                <h4>📋 Before You Start</h4>
                <div class="alert alert-info">
                    <strong>Time Required:</strong> 2-4 hours for first build<br>
                    <strong>Difficulty:</strong> Beginner<br>
                    <strong>Tools Needed:</strong> Phillips head screwdriver, anti-static wrist strap (optional)
                </div>

                <h4>🛠️ Essential Tools</h4>
                <ul>
                    <li><strong>Phillips head screwdriver:</strong> Medium size (#2) for most screws</li>
                    <li><strong>Anti-static wrist strap:</strong> Prevents static damage (optional but recommended)</li>
                    <li><strong>Zip ties:</strong> For cable management</li>
                    <li><strong>Thermal paste:</strong> Usually included with CPU cooler</li>
                    <li><strong>Good lighting:</strong> Ensure you can see all connectors clearly</li>
                </ul>

                <h4>📦 Component Overview</h4>
                <div class="row g-3 mb-4">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h6>🔌 Power Supply Unit (PSU)</h6>
                                <p class="small">Provides power to all components. Install first as it's heavy and harder to maneuver later.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h6>🏠 Motherboard</h6>
                                <p class="small">The main circuit board that connects all components. Install CPU and RAM before mounting.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <h4>🔄 Step-by-Step Assembly Process</h4>
                
                <div class="accordion" id="buildSteps">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#step1">
                                Step 1: Prepare Your Workspace
                            </button>
                        </h2>
                        <div id="step1" class="accordion-collapse collapse show" data-bs-parent="#buildSteps">
                            <div class="accordion-body">
                                <ul>
                                    <li>Clear a large, well-lit workspace</li>
                                    <li>Remove all components from boxes and anti-static bags</li>
                                    <li>Keep motherboard manual handy - you'll reference it frequently</li>
                                    <li>Ground yourself by touching a metal part of the case or wearing anti-static strap</li>
                                </ul>
                                <div class="alert alert-warning">
                                    <strong>⚠️ Important:</strong> Never force any component. If it doesn't fit easily, double-check orientation and compatibility.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#step2">
                                Step 2: Install Power Supply
                            </button>
                        </h2>
                        <div id="step2" class="accordion-collapse collapse" data-bs-parent="#buildSteps">
                            <div class="accordion-body">
                                <ol>
                                    <li>Position PSU with fan facing down (if case has bottom ventilation) or up (if no bottom vent)</li>
                                    <li>Align PSU with mounting holes in case</li>
                                    <li>Secure with four screws from outside the case</li>
                                    <li>Ensure power switch is accessible</li>
                                </ol>
                                <p><strong>Pro Tip:</strong> If using a modular PSU, connect cables after installing to avoid clutter.</p>
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#step3">
                                Step 3: Prepare Motherboard
                            </button>
                        </h2>
                        <div id="step3" class="accordion-collapse collapse" data-bs-parent="#buildSteps">
                            <div class="accordion-body">
                                <h6>Install CPU:</h6>
                                <ol>
                                    <li>Open CPU socket by lifting retention arm</li>
                                    <li>Remove plastic socket cover (keep it safe for warranty)</li>
                                    <li>Align CPU with socket - look for alignment triangles</li>
                                    <li>Gently place CPU in socket (should drop in easily)</li>
                                    <li>Lower retention arm to secure CPU</li>
                                </ol>
                                
                                <h6>Install RAM:</h6>
                                <ol>
                                    <li>Open RAM slot clips</li>
                                    <li>Align RAM stick notch with slot</li>
                                    <li>Press down firmly until clips snap into place</li>
                                    <li>For dual-channel, use slots 2 and 4 (usually color-coded)</li>
                                </ol>
                                
                                <div class="alert alert-danger">
                                    <strong>🚨 Critical:</strong> CPU has delicate pins. Handle with extreme care and never touch the bottom.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#step4">
                                Step 4: Install CPU Cooler
                            </button>
                        </h2>
                        <div id="step4" class="accordion-collapse collapse" data-bs-parent="#buildSteps">
                            <div class="accordion-body">
                                <ol>
                                    <li>Apply thermal paste if not pre-applied (rice grain size)</li>
                                    <li>Mount cooler according to manufacturer instructions</li>
                                    <li>Connect cooler power cable to CPU_FAN header</li>
                                    <li>Ensure even pressure - don't overtighten</li>
                                </ol>
                                <p><strong>Note:</strong> Some coolers require installing mounting brackets before motherboard installation.</p>
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#step5">
                                Step 5: Install Motherboard in Case
                            </button>
                        </h2>
                        <div id="step5" class="accordion-collapse collapse" data-bs-parent="#buildSteps">
                            <div class="accordion-body">
                                <ol>
                                    <li>Install I/O shield in case (press firmly until it clicks)</li>
                                    <li>Install motherboard standoffs in correct positions</li>
                                    <li>Carefully lower motherboard into case</li>
                                    <li>Align ports with I/O shield</li>
                                    <li>Secure with screws (don't overtighten)</li>
                                </ol>
                                <div class="alert alert-warning">
                                    <strong>⚠️ Warning:</strong> Never install motherboard without standoffs - this will short-circuit the board.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#step6">
                                Step 6: Install Storage and Graphics Card
                            </button>
                        </h2>
                        <div id="step6" class="accordion-collapse collapse" data-bs-parent="#buildSteps">
                            <div class="accordion-body">
                                <h6>Install M.2 SSD:</h6>
                                <ol>
                                    <li>Locate M.2 slot on motherboard</li>
                                    <li>Remove mounting screw</li>
                                    <li>Insert SSD at 30-degree angle</li>
                                    <li>Press down and secure with screw</li>
                                </ol>
                                
                                <h6>Install Graphics Card:</h6>
                                <ol>
                                    <li>Remove appropriate PCIe slot covers from case</li>
                                    <li>Open PCIe slot retention clip</li>
                                    <li>Align graphics card with top PCIe x16 slot</li>
                                    <li>Press down firmly until it clicks</li>
                                    <li>Secure with screws to case</li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#step7">
                                Step 7: Connect All Cables
                            </button>
                        </h2>
                        <div id="step7" class="accordion-collapse collapse" data-bs-parent="#buildSteps">
                            <div class="accordion-body">
                                <h6>Power Connections:</h6>
                                <ul>
                                    <li>24-pin motherboard power</li>
                                    <li>8-pin CPU power (top-left of motherboard)</li>
                                    <li>PCIe power for graphics card (if required)</li>
                                    <li>SATA power for drives</li>
                                </ul>
                                
                                <h6>Data Connections:</h6>
                                <ul>
                                    <li>SATA data cables for drives</li>
                                    <li>Front panel connectors (power button, USB, audio)</li>
                                    <li>Case fans to motherboard or PSU</li>
                                </ul>
                                
                                <div class="alert alert-info">
                                    <strong>💡 Tip:</strong> Refer to your motherboard manual for front panel connector layout - these tiny connectors are the trickiest part.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#step8">
                                Step 8: First Boot and Testing
                            </button>
                        </h2>
                        <div id="step8" class="accordion-collapse collapse" data-bs-parent="#buildSteps">
                            <div class="accordion-body">
                                <ol>
                                    <li>Double-check all connections</li>
                                    <li>Connect monitor to graphics card (not motherboard)</li>
                                    <li>Plug in power cable and turn on PSU</li>
                                    <li>Press case power button</li>
                                    <li>Look for BIOS/UEFI screen</li>
                                </ol>
                                
                                <h6>If it doesn't boot:</h6>
                                <ul>
                                    <li>Check RAM is properly seated</li>
                                    <li>Verify all power connections</li>
                                    <li>Ensure front panel connectors are correct</li>
                                    <li>Try one RAM stick at a time</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <h4>🎯 Final Steps</h4>
                <ol>
                    <li><strong>Install Operating System:</strong> Create Windows installation media and install</li>
                    <li><strong>Install Drivers:</strong> Motherboard chipset, graphics card, and peripheral drivers</li>
                    <li><strong>Update BIOS:</strong> Check manufacturer website for latest BIOS updates</li>
                    <li><strong>Stress Test:</strong> Run stability tests to ensure everything works properly</li>
                    <li><strong>Cable Management:</strong> Route cables neatly for better airflow</li>
                </ol>

                <div class="alert alert-success">
                    <h6>🎉 Congratulations!</h6>
                    <p class="mb-0">You've successfully built your first PC! Take your time, be patient, and don't hesitate to double-check everything. The PC building community is always ready to help if you encounter issues.</p>
                </div>
            </div>
        `
    },
    
    tools: {
        title: "Essential Tools & Workspace Setup",
        content: `
            <div class="guide-content">
                <h3>🛠️ Essential Tools & Workspace Setup</h3>
                <p class="lead">Having the right tools and workspace setup is crucial for a successful PC build. Here's everything you need to know.</p>

                <h4>🔧 Required Tools</h4>
                <div class="row g-3 mb-4">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h6>Phillips Head Screwdriver</h6>
                                <p class="small mb-2"><strong>Size:</strong> #2 (medium)</p>
                                <p class="small">The most important tool - 90% of PC screws use this size. Magnetic tip is helpful but not required.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h6>Anti-Static Wrist Strap</h6>
                                <p class="small mb-2"><strong>Cost:</strong> $5-10</p>
                                <p class="small">Prevents static electricity from damaging components. Alternative: touch case regularly.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <h4>📋 Helpful (Not Required) Tools</h4>
                <ul>
                    <li><strong>Zip ties:</strong> For cable management ($5)</li>
                    <li><strong>Thermal paste:</strong> Usually included with cooler ($10)</li>
                    <li><strong>Flashlight or headlamp:</strong> For seeing in dark corners</li>
                    <li><strong>Small bowl:</strong> To hold screws</li>
                    <li><strong>Tweezers:</strong> For small connectors</li>
                    <li><strong>Compressed air:</strong> For cleaning</li>
                </ul>

                <h4>🏠 Workspace Setup</h4>
                <div class="alert alert-info">
                    <h6>Ideal Workspace Requirements:</h6>
                    <ul class="mb-0">
                        <li>Large, flat surface (dining table works great)</li>
                        <li>Good lighting (desk lamp recommended)</li>
                        <li>Anti-static mat (or work on hardwood/tile)</li>
                        <li>Room to spread out components</li>
                        <li>Power outlet nearby for testing</li>
                    </ul>
                </div>

                <h4>⚠️ What to Avoid</h4>
                <div class="alert alert-warning">
                    <ul class="mb-0">
                        <li><strong>Carpet:</strong> Generates static electricity</li>
                        <li><strong>Socks on carpet:</strong> Static electricity risk</li>
                        <li><strong>Clutter:</strong> Easy to lose small screws</li>
                        <li><strong>Poor lighting:</strong> Hard to see connector orientations</li>
                        <li><strong>Pets nearby:</strong> Hair can get into components</li>
                    </ul>
                </div>

                <h4>💡 Pro Tips</h4>
                <ol>
                    <li><strong>Organization:</strong> Keep component boxes - great for storing cables</li>
                    <li><strong>Documentation:</strong> Take photos before disconnecting cables</li>
                    <li><strong>Patience:</strong> Rushing leads to mistakes and potential damage</li>
                    <li><strong>Manuals:</strong> Keep motherboard manual handy throughout build</li>
                    <li><strong>Testing:</strong> Test components outside case first if possible</li>
                </ol>

                <h4>🧹 Post-Build Cleanup</h4>
                <ul>
                    <li>Save all extra screws and cables</li>
                    <li>Keep component boxes for warranty/resale</li>
                    <li>Store driver discs (though download latest online)</li>
                    <li>Document your build specs for future reference</li>
                </ul>
            </div>
        `
    },

    cpu: {
        title: "CPU Selection and Installation Guide",
        content: `
            <div class="guide-content">
                <h3>🔄 CPU Selection and Installation Guide</h3>
                <p class="lead">The CPU is the brain of your computer. Choosing and installing the right processor is crucial for your system's performance.</p>

                <h4>🏢 Intel vs AMD: Current Landscape (2024)</h4>
                <div class="row g-3 mb-4">
                    <div class="col-md-6">
                        <div class="card border-primary">
                            <div class="card-header bg-primary text-white">Intel Processors</div>
                            <div class="card-body">
                                <h6>Strengths:</h6>
                                <ul class="small">
                                    <li>Strong single-core performance</li>
                                    <li>Better for gaming at high refresh rates</li>
                                    <li>Integrated graphics (Intel UHD)</li>
                                    <li>Thunderbolt support</li>
                                </ul>
                                <h6>Current Generations:</h6>
                                <ul class="small mb-0">
                                    <li><strong>13th Gen (Raptor Lake):</strong> i5-13600K, i7-13700K, i9-13900K</li>
                                    <li><strong>12th Gen (Alder Lake):</strong> i5-12600K, i7-12700K</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card border-danger">
                            <div class="card-header bg-danger text-white">AMD Processors</div>
                            <div class="card-body">
                                <h6>Strengths:</h6>
                                <ul class="small">
                                    <li>Excellent multi-core performance</li>
                                    <li>Better price-to-performance ratio</li>
                                    <li>Lower power consumption</li>
                                    <li>AM4/AM5 socket longevity</li>
                                </ul>
                                <h6>Current Generations:</h6>
                                <ul class="small mb-0">
                                    <li><strong>7000 Series (Zen 4):</strong> 7600X, 7700X, 7800X3D, 7900X</li>
                                    <li><strong>5000 Series (Zen 3):</strong> 5600X, 5700X, 5800X3D</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <h4>🎯 CPU Selection by Use Case</h4>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Use Case</th>
                                <th>Budget ($150-250)</th>
                                <th>Mid-Range ($250-400)</th>
                                <th>High-End ($400+)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Gaming</strong></td>
                                <td>AMD 5600X<br>Intel i5-12400F</td>
                                <td>AMD 7600X<br>Intel i5-13600K</td>
                                <td>AMD 7800X3D<br>Intel i7-13700K</td>
                            </tr>
                            <tr>
                                <td><strong>Content Creation</strong></td>
                                <td>AMD 5700X<br>Intel i5-13400</td>
                                <td>AMD 7700X<br>Intel i7-13700K</td>
                                <td>AMD 7900X<br>Intel i9-13900K</td>
                            </tr>
                            <tr>
                                <td><strong>Office/General</strong></td>
                                <td>AMD 5600G<br>Intel i3-13100</td>
                                <td>AMD 7600X<br>Intel i5-13400</td>
                                <td>Not necessary</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h4>🔧 CPU Installation Steps</h4>
                <div class="alert alert-danger">
                    <h6>⚠️ CRITICAL WARNING</h6>
                    <p class="mb-0">CPU pins are extremely delicate. One bent pin can ruin a $300+ processor. Take your time and never force anything.</p>
                </div>

                <div class="accordion" id="cpuSteps">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#cpuStep1">
                                Step 1: Prepare the Socket
                            </button>
                        </h2>
                        <div id="cpuStep1" class="accordion-collapse collapse show" data-bs-parent="#cpuSteps">
                            <div class="accordion-body">
                                <ol>
                                    <li>Place motherboard on anti-static surface</li>
                                    <li>Locate CPU socket (large square with retention arm)</li>
                                    <li>Lift retention arm fully (requires some force)</li>
                                    <li>Remove plastic socket cover (SAVE THIS - needed for warranty)</li>
                                    <li>DO NOT touch socket pins/contacts</li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#cpuStep2">
                                Step 2: Handle the CPU
                            </button>
                        </h2>
                        <div id="cpuStep2" class="accordion-collapse collapse" data-bs-parent="#cpuSteps">
                            <div class="accordion-body">
                                <ol>
                                    <li>Remove CPU from anti-static packaging</li>
                                    <li>Hold CPU by edges only - never touch pins or contacts</li>
                                    <li>Look for alignment markers (triangle/arrow on corner)</li>
                                    <li>AMD: Pins on CPU, holes in socket</li>
                                    <li>Intel: Contacts on CPU, pins in socket</li>
                                </ol>
                                <div class="alert alert-warning">
                                    <strong>AMD CPUs:</strong> Have fragile pins that can break easily<br>
                                    <strong>Intel CPUs:</strong> Have contact pads - pins are in socket
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#cpuStep3">
                                Step 3: Install the CPU
                            </button>
                        </h2>
                        <div id="cpuStep3" class="accordion-collapse collapse" data-bs-parent="#cpuSteps">
                            <div class="accordion-body">
                                <ol>
                                    <li>Align CPU triangle with socket triangle</li>
                                    <li>Lower CPU straight down (should drop in easily)</li>
                                    <li>DO NOT FORCE - if it doesn't sit flat, check alignment</li>
                                    <li>CPU should sit flush with socket</li>
                                    <li>Lower retention arm (may require moderate force)</li>
                                    <li>Retention arm should lock in place</li>
                                </ol>
                                <div class="alert alert-success">
                                    <strong>✅ Success Indicator:</strong> CPU should drop into socket with zero force when properly aligned.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <h4>🌡️ Thermal Considerations</h4>
                <ul>
                    <li><strong>Stock Coolers:</strong> AMD includes good coolers, Intel's are basic</li>
                    <li><strong>Thermal Paste:</strong> Usually pre-applied on stock coolers</li>
                    <li><strong>Upgrade Recommendations:</strong> Aftermarket cooler for overclocking</li>
                    <li><strong>Installation Order:</strong> Install CPU first, then cooler</li>
                </ul>

                <h4>❌ Common Mistakes</h4>
                <div class="alert alert-danger">
                    <ul class="mb-0">
                        <li>Forcing CPU into socket</li>
                        <li>Installing with wrong orientation</li>
                        <li>Touching CPU pins/contacts</li>
                        <li>Forgetting to remove plastic socket cover</li>
                        <li>Over-tightening cooler mounting screws</li>
                    </ul>
                </div>

                <h4>🔍 Troubleshooting</h4>
                <ul>
                    <li><strong>PC won't boot:</strong> Reseat CPU, check power connections</li>
                    <li><strong>High temperatures:</strong> Check thermal paste application</li>
                    <li><strong>Bent pins (AMD):</strong> Very carefully straighten with mechanical pencil</li>
                    <li><strong>CPU not recognized:</strong> Update motherboard BIOS</li>
                </ul>
            </div>
        `
    }
};

// Function to show guides in modal
function showGuide(guideKey) {
    const guide = guides[guideKey];
    if (guide) {
        document.getElementById('guideTitle').textContent = guide.title;
        document.getElementById('guideContent').innerHTML = guide.content;
        const modal = new bootstrap.Modal(document.getElementById('guideModal'));
        modal.show();
    }
}

// Console message for developers
console.log('🖥️ PCBuildHelper - Built with passion for PC gaming!');
console.log('💡 Keyboard shortcuts: h=home, b=builds, g=guides');
