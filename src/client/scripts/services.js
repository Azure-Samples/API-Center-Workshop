document.addEventListener("DOMContentLoaded", () => {
    const fetchAndDisplayServices = async () => {
        const servicesContainer = document.getElementById("services-container");
        
        // Verify container exists
        if (!servicesContainer) {
            console.error('Services container element not found. Make sure element with id "services-container" exists.');
            return;
        }

        try {
            const response = await fetch('/api/services');
            // const response = await fetch('http://localhost:8080/services');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            // Clear container
            servicesContainer.innerHTML = '';

            // Check if services exist in response
            if (!data.services || !Array.isArray(data.services)) {
                throw new Error('Invalid services data received');
            }

            // Create and append service cards
            data.services.forEach((service) => {
                const card = document.createElement('div');
                card.className = 'service-card';
                card.innerHTML = `
                    <img src="${service.image}" alt="${service.title}" class="service-image">
                    <h2>${service.title}</h2>
                    <p>${service.description}</p>
                `;
                servicesContainer.appendChild(card);
            });
        } catch (error) {
            console.error('Error fetching services:', error);
            if (servicesContainer) {
                servicesContainer.innerHTML = '<p>Failed to load services. Please try again later.</p>';
            }
        }
    };

    fetchAndDisplayServices();
});