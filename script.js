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
    });
    
    

    // Enhanced dropdown functionality with hover intent
    document.addEventListener('DOMContentLoaded', function() {
        const dropdowns = document.querySelectorAll('.nav-dropdown');
        let hoverTimeout;
        
        // Function to close all dropdowns
        function closeAllDropdowns() {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
                dropdown.querySelector('.dropdown-content').style.opacity = '0';
                dropdown.querySelector('.dropdown-content').style.visibility = 'hidden';
            });
        }
        
        // Function to open a specific dropdown
        function openDropdown(dropdown) {
            closeAllDropdowns();
            dropdown.classList.add('active');
            dropdown.querySelector('.dropdown-content').style.opacity = '1';
            dropdown.querySelector('.dropdown-content').style.visibility = 'visible';
        }
        
        // Desktop hover functionality with intent detection
        if (window.innerWidth > 768) {
            dropdowns.forEach(dropdown => {
                dropdown.addEventListener('mouseenter', function() {
                    clearTimeout(hoverTimeout);
                    hoverTimeout = setTimeout(() => {
                        openDropdown(this);
                    }, 150); // Short delay to detect hover intent
                });
                
                dropdown.addEventListener('mouseleave', function() {
                    clearTimeout(hoverTimeout);
                    hoverTimeout = setTimeout(() => {
                        if (!this.matches(':hover')) {
                            closeAllDropdowns();
                        }
                    }, 200); // Delay before closing
                });
                
                // Keep dropdown open if hovering over it
                dropdown.querySelector('.dropdown-content').addEventListener('mouseenter', function() {
                    clearTimeout(hoverTimeout);
                });
                
                dropdown.querySelector('.dropdown-content').addEventListener('mouseleave', function() {
                    hoverTimeout = setTimeout(() => {
                        closeAllDropdowns();
                    }, 300);
                });
            });
        }
        
        // For mobile devices, make dropdowns clickable
        function setupMobileDropdowns() {
            dropdowns.forEach(dropdown => {
                const link = dropdown.querySelector('a');
                
                link.addEventListener('click', function(e) {
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
                });
            });
            
            // Close dropdowns when clicking elsewhere
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.nav-dropdown')) {
                    closeAllDropdowns();
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
            if (window.innerWidth <= 768) {
                setupMobileDropdowns();
            }
        }
        
        // Initial setup
        initDropdowns();
        
        // Update on window resize
        window.addEventListener('resize', initDropdowns);
        
        // Highlight current page in navigation
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.nav a');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html') ||
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