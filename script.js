document.addEventListener("DOMContentLoaded", () => {
    const menuIcon = document.getElementById("menu");
    const navbar = document.getElementById("navbar");

    // Toggle mobile menu
    menuIcon.addEventListener("click", () => {
        navbar.classList.toggle("active");
    });

    // Handle form submission
    const form = document.getElementById("request-form");
    
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const fullName = document.getElementById("full-name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const pickupAddress = document.getElementById("pickup-address").value.trim();
        const dropoffAddress = document.getElementById("dropoff-address").value.trim();
        
        if (!fullName || !email || !phone || !pickupAddress || !dropoffAddress) {
            alert("Please fill in all required fields.");
            return;
        }

        alert("Transport request submitted successfully!");
        form.reset();


        
    });
});

