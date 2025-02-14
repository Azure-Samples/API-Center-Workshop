async function fetchAndDisplayPets() {
    try {
        console.log('Fetching pets data...');
        const apiUrl = 'https://contoso-airlines-petcompanion.azurewebsites.net/api/pets-get?';
        // const apiUrl = 'http://localhost:7071/api/pets-get';
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const pets = await response.json();
        console.log('Pets data:', pets);

        const petsContainer = document.getElementById('pets-container');
        if (!petsContainer) {
            console.error('Pets container element not found.');
            return;
        }

        petsContainer.innerHTML = ''; // Clear existing content

        pets.forEach(pet => {
            const petCard = document.createElement('div');
            petCard.className = 'pet-card';

            petCard.innerHTML = `
                <img src="${pet.image}" alt="${pet.name}" class="pet-image">
                <h3>${pet.name}</h3>
                <p class="pet-species">${pet.species}</p>
                <p class="pet-description">${pet.description}</p>
                <p class="pet-location">Find me at: ${pet.airport_code}</p>
            `;

            petsContainer.appendChild(petCard);
        });
    } catch (error) {
        console.error('Error fetching pets:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchAndDisplayPets);