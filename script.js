let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

// Toggle menu icon and navbar for mobile view
menu.onclick = () => {
    menu.classList.toggle('fa-x');
    navbar.classList.toggle('active');
};

// -------------------------------------------------------------------------

// Feature 1: Dynamic Active Navigation Links on Scroll
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navbar a');

window.onscroll = () => {
    // Hide the mobile menu when scrolling
    menu.classList.remove('fa-x');
    navbar.classList.remove('active');

    // Logic to set the active link in the navigation bar
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150; // Offset from the top of the section
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('home-active'); // Remove from all
                if (link.getAttribute('href').includes(id)) {
                    link.classList.add('home-active'); // Add to the current section's link
                }
            });
        }
    });

    // Optional: Add/remove header shadow on scroll (if not already handled in CSS)
    const header = document.querySelector('header');
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
};

// -------------------------------------------------------------------------

// Feature 2: Product Interaction (Simulated Cart and Wishlist)

// Select all cart and heart icons
let cartIcons = document.querySelectorAll('.products-container .box .fa-cart-shopping');
let heartIcons = document.querySelectorAll('.products-container .box .fa-heart');

// Add a simple interaction to the Add to Cart button
cartIcons.forEach(icon => {
    icon.onclick = (e) => {
        // Prevent default link/button action if it were a full link
        e.preventDefault();
        
        // Find the product title for a better user feedback
        let productBox = icon.closest('.box');
        let productName = productBox.querySelector('h2').innerText.split('\n')[0].trim();

        // Simple feedback
        alert(`${productName} added to your cart! 🛍️`);
        
        // A real implementation would involve:
        // 1. Sending an AJAX request to the server.
        // 2. Updating a cart counter in the header.
    };
});

// Add a simple interaction to the Wishlist button
heartIcons.forEach(icon => {
    icon.onclick = (e) => {
        e.preventDefault();
        icon.classList.toggle('fa-solid'); // Toggles filled heart
        icon.classList.toggle('fa-regular'); // Toggles outline heart

        let productBox = icon.closest('.box');
        let productName = productBox.querySelector('h2').innerText.split('\n')[0].trim();

        if (icon.classList.contains('fa-solid')) {
            console.log(`${productName} added to Wishlist!`);
        } else {
            console.log(`${productName} removed from Wishlist!`);
        }
    };
});

// -------------------------------------------------------------------------

// Feature 3: Placeholder for Eco-Friendly Packaging Calculator
// A full calculator requires a separate HTML/CSS structure (not included here)
// but this sets up the functional core.

function calculateImpact(materialWeight_g, distance_km) {
    // Simplified environmental impact calculation (fictional)
    // Co2 factor: Paper: 0.8g/g, Cardboard: 0.7g/g, Reusable Fabric: 0.1g/g
    // Transport factor: 0.1g CO2 per km per gram of product

    const BASE_CO2_PER_GRAM = 0.5; // Average CO2 for production
    const CO2_PER_KM_PER_GRAM = 0.0001; // Transport CO2 factor
    
    // Simulate an 'eco-friendly' boost
    const ecoReductionFactor = 0.8; 

    let productionImpact = materialWeight_g * BASE_CO2_PER_GRAM * ecoReductionFactor;
    let transportImpact = materialWeight_g * distance_km * CO2_PER_KM_PER_GRAM;
    
    let totalImpact = productionImpact + transportImpact;

    return {
        totalImpact: totalImpact.toFixed(2), // Total CO2 in grams
        wasteReduction: (materialWeight_g / 100).toFixed(2) // Fictional waste reduction score
    };
}

// Link the calculator logic to the HTML elements
document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');

    if (calculateBtn) {
        calculateBtn.onclick = () => {
            const weight = parseFloat(document.getElementById('material-weight').value);
            const distance = parseFloat(document.getElementById('distance').value);

            if (isNaN(weight) || isNaN(distance) || weight <= 0 || distance <= 0) {
                alert("Please enter valid weight and distance values.");
                return;
            }

            const results = calculateImpact(weight, distance);

            document.getElementById('co2-result').textContent = `${results.totalImpact}g`;
            document.getElementById('waste-result').textContent = results.wasteReduction;
            
            // Provide visual feedback
            document.getElementById('impact-result').style.opacity = '1';
        };
    }
});
