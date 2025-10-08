// script.js — clean, pure JavaScript
// Features:
//  - JSON-LD injection
//  - Accordion helper: toggleAccordion(el)
//  - Map rotation & interaction
//  - Contact form submission
//  - Navigation dropdown behavior (desktop hover, mobile tap first-to-open)

// Inject JSON-LD safely
(function () {
    const jsonLd = {
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
    };

    function inject() {
        try {
            const s = document.createElement('script');
            s.type = 'application/ld+json';
            s.text = JSON.stringify(jsonLd, null, 2);
            document.head.appendChild(s);
            return true;
        } catch (e) { return false; }
    }

    if (!inject()) document.addEventListener('DOMContentLoaded', inject);
})();

// Accordion helper (used from inline HTML)
function toggleAccordion(element) {
    const content = element.nextElementSibling;
    const allContents = document.querySelectorAll('.accordion-content');
    const allHeaders = document.querySelectorAll('.accordion-header');

    allContents.forEach(it => { if (it !== content) it.classList.remove('active'); });
    allHeaders.forEach(h => { if (h !== element) { const i = h.querySelector('i'); if (i) { i.classList.remove('fa-chevron-up'); i.classList.add('fa-chevron-down'); } } });

    if (content) content.classList.toggle('active');
    const icon = element.querySelector('i');
    if (icon) { icon.classList.toggle('fa-chevron-down'); icon.classList.toggle('fa-chevron-up'); }
}

(function () {
    document.addEventListener('DOMContentLoaded', function () {
        // Map rotation
        const mapPoints = document.querySelectorAll('.map-point');
        const locationInfos = document.querySelectorAll('.location-info');
        const locationList = document.querySelectorAll('.location-list li');
        const mapContainer = document.querySelector('.map-container');
        const toggleRotationBtn = document.getElementById('toggle-rotation');

        let rotationInterval; let currentIndex = 0; let isRotating = true;

        function showLocation(loc) {
            mapPoints.forEach(p => p.classList.remove('active'));
            locationInfos.forEach(i => i.classList.remove('active'));
            const p = document.querySelector('.map-point[data-location="' + loc + '"]'); if (p) p.classList.add('active');
            const info = document.getElementById(loc + '-info'); if (info) info.classList.add('active');
        }

        function rotateLocations() {
            if (!isRotating || !mapPoints.length) return;
            mapPoints.forEach(p => p.classList.remove('active'));
            locationInfos.forEach(i => i.classList.remove('active'));
            mapPoints[currentIndex].classList.add('active');
            const loc = mapPoints[currentIndex].getAttribute('data-location');
            const info = document.getElementById(loc + '-info'); if (info) info.classList.add('active');
            currentIndex = (currentIndex + 1) % mapPoints.length;
        }

        if (mapPoints.length) rotationInterval = setInterval(rotateLocations, 5000);
        mapPoints.forEach(pt => pt.addEventListener('click', function (e) { e.stopPropagation(); const loc = this.getAttribute('data-location'); if (loc) showLocation(loc); }));
        locationList.forEach(li => li.addEventListener('click', function () { const loc = this.getAttribute('data-location'); if (loc) showLocation(loc); }));
        if (mapContainer) mapContainer.addEventListener('click', function (e) { if (e.target.closest('.location-info')) return; mapPoints.forEach(p => p.classList.remove('active')); locationInfos.forEach(i => i.classList.remove('active')); });
        if (toggleRotationBtn) toggleRotationBtn.addEventListener('click', function () { isRotating = !isRotating; if (isRotating) { this.innerHTML = '<i class="fas fa-pause"></i> Pause Auto-Rotation'; rotationInterval = setInterval(rotateLocations, 5000); } else { this.innerHTML = '<i class="fas fa-play"></i> Resume Auto-Rotation'; clearInterval(rotationInterval); } });

        // Contact form
        const form = document.getElementById('contactForm'); const thankYou = document.getElementById('thankYouMessage');
        if (form) form.addEventListener('submit', function (e) { e.preventDefault(); const fd = new FormData(form); fetch(form.action, { method: form.method, body: fd, headers: { 'Accept': 'application/json' } }).then(resp => { if (resp.ok) { form.style.display = 'none'; if (thankYou) thankYou.style.display = 'block'; form.reset(); } else alert('Oops! There was a problem submitting your form'); }).catch(() => alert('Oops! There was a problem submitting your form')); });

        // Dropdown behavior
        const dropdowns = Array.from(document.querySelectorAll('.nav-dropdown'));
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('.nav'); let hoverTimeout;

        if (menuToggle && nav) menuToggle.addEventListener('click', function () { nav.classList.toggle('active'); this.classList.toggle('active'); });

        function closeAllDropdowns() { dropdowns.forEach(d => { d.classList.remove('active'); const c = d.querySelector('.dropdown-content'); if (c) { c.style.opacity = ''; c.style.visibility = ''; } }); }
        function openDropdown(d) { closeAllDropdowns(); d.classList.add('active'); const c = d.querySelector('.dropdown-content'); if (c && window.innerWidth > 768) { c.style.opacity = '1'; c.style.visibility = 'visible'; } }

        dropdowns.forEach(function (d) { const c = d.querySelector('.dropdown-content'); d.addEventListener('mouseenter', function () { if (window.innerWidth > 768) { clearTimeout(hoverTimeout); hoverTimeout = setTimeout(function () { openDropdown(d); }, 150); } }); d.addEventListener('mouseleave', function () { if (window.innerWidth > 768) { clearTimeout(hoverTimeout); hoverTimeout = setTimeout(closeAllDropdowns, 200); } }); if (c) { c.addEventListener('mouseenter', function () { if (window.innerWidth > 768) clearTimeout(hoverTimeout); }); c.addEventListener('mouseleave', function () { if (window.innerWidth > 768) hoverTimeout = setTimeout(closeAllDropdowns, 200); }); } });

        function setupMobileDropdowns() {
            dropdowns.forEach(function (d) { const link = d.querySelector('a'); if (!link) return; if (link.dataset.mobileAttached) return; link.addEventListener('click', function (e) { if (window.innerWidth <= 768) { if (!d.classList.contains('active')) { e.preventDefault(); e.stopPropagation(); dropdowns.forEach(function (other) { if (other !== d) other.classList.remove('active'); }); d.classList.add('active'); } else { /* allow navigation */ } } }); link.dataset.mobileAttached = '1'; });

            // close when tapping outside
            document.addEventListener('click', function (e) { if (window.innerWidth <= 768) { if (!e.target.closest('.nav-dropdown') && !e.target.closest('.menu-toggle')) { closeAllDropdowns(); if (nav && nav.classList.contains('active')) { nav.classList.remove('active'); if (menuToggle) menuToggle.classList.remove('active'); } } } });
            window.addEventListener('scroll', function () { if (window.innerWidth <= 768) closeAllDropdowns(); });
        }

        function initDropdowns() { closeAllDropdowns(); if (window.innerWidth <= 768) setupMobileDropdowns(); }
        initDropdowns(); window.addEventListener('resize', initDropdowns);

        // Highlight current page and parent 'services' when on subpages
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav a');
        navLinks.forEach(function (link) { const linkPage = link.getAttribute('href'); if (!linkPage) return; if (linkPage === currentPage || (currentPage === 'index.html' && linkPage === 'index.html')) link.classList.add('active'); if (linkPage === 'services.html' && ['engineering-manufacturing.html', 'energy-petrochemicals.html', 'chemicals-minerals.html', 'pharma-products.html', 'bauxite-product.html', 'biochar-product.html'].indexOf(currentPage) !== -1) link.classList.add('active'); });

    });
})();

// Enhanced tab functionality
document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.spec-tab');
    const contents = document.querySelectorAll('.spec-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-specs`).classList.add('active');
        });
    });
});
