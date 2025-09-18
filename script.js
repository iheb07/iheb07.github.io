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
    // Mobile dropdown toggle
    document.addEventListener('DOMContentLoaded', function() {
        const dropdowns = document.querySelectorAll('.nav-dropdown');
        
        // For mobile devices, make dropdowns clickable
        if (window.innerWidth <= 768) {
            dropdowns.forEach(dropdown => {
                const link = dropdown.querySelector('a');
                
                link.addEventListener('click', function(e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                    }
                });
            });
            
            // Close dropdowns when clicking elsewhere
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.nav-dropdown')) {
                    dropdowns.forEach(dropdown => {
                        dropdown.classList.remove('active');
                    });
                }
            });
        }
    });
    // Highlight current page in navigation
    document.addEventListener('DOMContentLoaded', function() {
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.nav a');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (currentPage === 'index.html' && linkPage === 'index.html')) {
                link.classList.add('active');
            }
        });
    });
</script>