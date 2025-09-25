<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Medora Group",
      "url": "https://www.medoragroup.com",
      "logo": "https://www.medoragroup.com/images/logo.png",
      "description": "Global trade and advisory services specializing in strategic sourcing and supply chain solutions",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3100 Blvd. de la Concorde Est",
        "addressLocality": "Laval",
        "addressRegion": "QC",
        "postalCode": "H7E 2B8",
        "addressCountry": "CA"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-514-652-7202",
        "contactType": "Customer service",
        "areaServed": ["CA", "TN", "AE", "IN", "GN", "FR", "DZ"],
        "availableLanguage": ["English", "French", "Arabic"]
      }
    }
</script>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const mapPoints = document.querySelectorAll('.map-point');
        const locationInfos = document.querySelectorAll('.location-info');
        const locationList = document.querySelectorAll('.location-list li');
        const mapContainer = document.querySelector('.map-container');
        const toggleRotationBtn = document.getElementById('toggle-rotation');
        
        let rotationInterval;
        let currentIndex = 0;
        let isRotating = true;
        
        // Function to show location info
        function showLocation(location) {
            // Remove active class from all points and infos
            mapPoints.forEach(p => p.classList.remove('active'));
            locationInfos.forEach(info => info.classList.remove('active'));
            
            // Add active class to clicked point and corresponding info
            const point = document.querySelector(`.map-point[data-location="${location}"]`);
            if (point) {
                point.classList.add('active');
            }
            
            const info = document.getElementById(`${location}-info`);
            if (info) {
                info.classList.add('active');
            }
        }
        
        // Function to rotate locations
        function rotateLocations() {
            if (!isRotating) return;
            
            mapPoints.forEach(p => p.classList.remove('active'));
            locationInfos.forEach(info => info.classList.remove('active'));
            
            mapPoints[currentIndex].classList.add('active');
            const location = mapPoints[currentIndex].getAttribute('data-location');
            document.getElementById(`${location}-info`).classList.add('active');
            
            currentIndex = (currentIndex + 1) % mapPoints.length;
        }
        
        // Start rotation
        rotationInterval = setInterval(rotateLocations, 5000);
        
        // Event listeners for map points
        mapPoints.forEach(point => {
            point.addEventListener('click', function(e) {
                e.stopPropagation();
                const location = this.getAttribute('data-location');
                showLocation(location);
            });
        });
        
        // Event listeners for location list items
        locationList.forEach(item => {
            item.addEventListener('click', function() {
                const location = this.getAttribute('data-location');
                showLocation(location);
            });
        });
        
        // Event listener for map container to close info boxes
        mapContainer.addEventListener('click', function(e) {
            // Check if the click was on a location info box
            if (e.target.closest('.location-info')) {
                return; // Do nothing if click is inside info box
            }
            
            // Remove active class from all points and infos
            mapPoints.forEach(p => p.classList.remove('active'));
            locationInfos.forEach(info => info.classList.remove('active'));
        });
        
        // Toggle rotation button
        if (toggleRotationBtn) {
            toggleRotationBtn.addEventListener('click', function() {
                isRotating = !isRotating;
                if (isRotating) {
                    this.innerHTML = '<i class="fas fa-pause"></i> Pause Auto-Rotation';
                    rotationInterval = setInterval(rotateLocations, 5000);
                } else {
                    this.innerHTML = '<i class="fas fa-play"></i> Resume Auto-Rotation';
                    clearInterval(rotationInterval);
                }
            });
        }
    });
    
    // Accordion functionality
    function toggleAccordion(element) {
        const content = element.nextElementSibling;
        const allContents = document.querySelectorAll('.accordion-content');
        const allHeaders = document.querySelectorAll('.accordion-header');
        
        // Close all other accordion items
        allContents.forEach(item => {
            if (item !== content) {
                item.classList.remove('active');
            }
        });
        
        allHeaders.forEach(header => {
            if (header !== element) {
                header.querySelector('i').classList.remove('fa-chevron-up');
                header.querySelector('i').classList.add('fa-chevron-down');
            }
        });
        
        // Toggle current item
        content.classList.toggle('active');
        
        // Toggle icon
        const icon = element.querySelector('i');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
    }
    
    // Initialize first accordion as open
    document.addEventListener('DOMContentLoaded', function() {
        const firstHeader = document.querySelector('.accordion-header');
        if (firstHeader) {
            firstHeader.click();
        }
    });
    
    // Contact form functionality
    const form = document.getElementById('contactForm');
    const thankYouMessage = document.getElementById('thankYouMessage');

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(form);

      fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          form.style.display = 'none';
          thankYouMessage.style.display = 'block';
          form.reset();
        } else {
          alert('Oops! There was a problem submitting your form');
        }
      }).catch(() => {
        alert('Oops! There was a problem submitting your form');
      });
    });
    
    // Enhanced dropdown functionality with hover intent
    document.addEventListener('DOMContentLoaded', function() {
        const dropdowns = document.querySelectorAll('.nav-dropdown');
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('.nav');
        let hoverTimeout;
        
        // Mobile menu toggle
        if (menuToggle && nav) {
            menuToggle.addEventListener('click', function() {
                nav.classList.toggle('active');
                this.classList.toggle('active');
            });
        }
        
        // Function to close all dropdowns
        function closeAllDropdowns() {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
                if (window.innerWidth > 768) {
                    const content = dropdown.querySelector('.dropdown-content');
                    if (content) {
                        content.style.opacity = '0';
                        content.style.visibility = 'hidden';
                    }
                }
            });
        }
        
        // Function to open a specific dropdown
        function openDropdown(dropdown) {
            closeAllDropdowns();
            dropdown.classList.add('active');
            if (window.innerWidth > 768) {
                const content = dropdown.querySelector('.dropdown-content');
                if (content) {
                    content.style.opacity = '1';
                    content.style.visibility = 'visible';
                }
            }
        }
        
        // Desktop hover functionality
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('mouseenter', function() {
                if (window.innerWidth > 768) {
                    clearTimeout(hoverTimeout);
                    hoverTimeout = setTimeout(() => {
                        openDropdown(this);
                    }, 150);
                }
            });
            
            dropdown.addEventListener('mouseleave', function() {
                if (window.innerWidth > 768) {
                    clearTimeout(hoverTimeout);
                    hoverTimeout = setTimeout(() => {
                        if (!this.matches(':hover')) {
                            closeAllDropdowns();
                        }
                    }, 200);
                }
            });
            
            // Keep dropdown open if hovering over content
            const dropdownContent = dropdown.querySelector('.dropdown-content');
            if (dropdownContent) {
                dropdownContent.addEventListener('mouseenter', function() {
                    if (window.innerWidth > 768) {
                        clearTimeout(hoverTimeout);
                    }
                });
                
                dropdownContent.addEventListener('mouseleave', function() {
                    if (window.innerWidth > 768) {
                        hoverTimeout = setTimeout(() => {
                            closeAllDropdowns();
                        }, 300);
                    }
                });
            }
        });
        
        // Mobile dropdown functionality
        function setupMobileDropdowns() {
            dropdowns.forEach(dropdown => {
                const link = dropdown.querySelector('a');
                
                // Remove existing listeners to prevent duplicates
                link.removeEventListener('click', handleMobileClick);
                
                // Add click listener for mobile
                link.addEventListener('click', handleMobileClick);
                
                function handleMobileClick(e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // Close other dropdowns
                        dropdowns.forEach(otherDropdown => {
                            if (otherDropdown !== dropdown) {
                                otherDropdown.classList.remove('active');
                            }
                        });
                        
                        // Toggle current dropdown
                        dropdown.classList.toggle('active');
                    }
                }
            });
            
            // Close dropdowns when clicking outside on mobile
            document.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    if (!e.target.closest('.nav-dropdown') && !e.target.closest('.menu-toggle')) {
                        closeAllDropdowns();
                        if (nav && nav.classList.contains('active')) {
                            nav.classList.remove('active');
                            if (menuToggle) menuToggle.classList.remove('active');
                        }
                    }
                }
            });
            
            // Close dropdowns when scrolling on mobile
            window.addEventListener('scroll', function() {
                if (window.innerWidth <= 768) {
                    closeAllDropdowns();
                }
            });
        }
        
        // Initialize based on screen size
        function initDropdowns() {
            closeAllDropdowns();
            
            if (window.innerWidth <= 768) {
                setupMobileDropdowns();
            }
        }
        
        // Initial setup
        initDropdowns();
        
        // Update on window resize
        window.addEventListener('resize', initDropdowns);
        
        // Highlight current page in navigation
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav a');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || 
                (currentPage === 'index.html' && linkPage === 'index.html')) {
                link.classList.add('active');
            }
            
            // Special handling for dropdown parent
            if (linkPage === 'services.html' && 
                (currentPage === 'engineering-manufacturing.html' || 
                 currentPage === 'energy-petrochemicals.html' ||
                 currentPage === 'chemicals-minerals.html' ||
                 currentPage === 'pharma-products.html')) {
                link.classList.add('active');
            }
        });
    });
</script>