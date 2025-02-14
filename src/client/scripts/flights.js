document.addEventListener("DOMContentLoaded", async () => {
    // Helper function to send GraphQL requests
    async function fetchGraphQL(query, variables = {}) {
        try {
            const response = await fetch('http://localhost:4000/graphql', { 
                // const response = await fetch('https://contoso-airlines.purpledune-837857f3.westeurope.azurecontainerapps.io/graphql', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query, variables })
            });
            return await response.json();
        } catch (error) {
            console.error("GraphQL request error:", error);
            throw error;
        }
    }

    const flightsContainer = document.getElementById("flights-container");

    // Verify container exists
    if (!flightsContainer) {
        console.error('Flights container element not found. Make sure element with id "flights-container" exists.');
        return;
    }

    // Fetch cities and passengers data from the API
    let cities = [];
    let passengers = [];
    try {
        const query = `
            query {
                getCities
                getPassengers
            }
        `;
        const result = await fetchGraphQL(query);
        cities = result.data.getCities;
        passengers = result.data.getPassengers;
    } catch (error) {
        console.error('Error fetching cities and passengers:', error);
    }

    // Create radio buttons for flight type
    const flightTypeContainer = document.createElement('div');
    flightTypeContainer.className = 'flight-type-container';
    flightTypeContainer.innerHTML = `
        <label>
            <input type="radio" name="flight-type" value="one-way" checked> One Way
        </label>
        <label>
            <input type="radio" name="flight-type" value="return"> Return
        </label>
    `;
    flightsContainer.appendChild(flightTypeContainer);

    // Create form for flight details
    const form = document.createElement('form');
    form.innerHTML = `
        <div class="form-fields">
            <div>
                <label for="departure-city">Departure City:</label>
                <select id="departure-city">
                    ${cities.map(city => `<option value="${city}">${city}</option>`).join('')}
                </select>
            </div>

            <div>
                <label for="arrival-city">Arrival City:</label>
                <select id="arrival-city">
                    ${cities.map(city => `<option value="${city}">${city}</option>`).join('')}
                </select>
            </div>

            <div>
                <label for="departure-date">Departure Date:</label>
                <input type="date" id="departure-date">
            </div>

            <div>
                <label for="return-date" id="return-date-label">Return Date:</label>
                <input type="date" id="return-date" disabled>
            </div>

            <div>
                <label for="passengers">Number of Passengers:</label>
                <select id="passengers">
                    ${passengers.map(num => `<option value="${num}">${num}</option>`).join('')}
                </select>
            </div>
        </div>

        <button type="submit">Search</button>
    `;
    flightsContainer.appendChild(form);

    // Show/hide return date based on flight type selection
    const flightTypeInputs = flightTypeContainer.querySelectorAll('input[name="flight-type"]');
    flightTypeInputs.forEach(input => {
        input.addEventListener('change', () => {
            const returnDateInput = document.getElementById('return-date');
            if (input.value === 'return') {
                returnDateInput.disabled = false;
                returnDateInput.style.opacity = 1;
            } else {
                returnDateInput.disabled = true;
                returnDateInput.style.opacity = 0.5;
            }
        });
    });

    // Handle form submission
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const departureCity = document.getElementById('departure-city').value;
        const arrivalCity = document.getElementById('arrival-city').value;
        const departureDate = document.getElementById('departure-date').value;
        const returnDate = document.getElementById('return-date').value;
        const passengers = document.getElementById('passengers').value;
        const flightType = document.querySelector('input[name="flight-type"]:checked').value;

        const query = `
            query GetFlights($departureCity: String, $arrivalCity: String, $departureDate: String, $returnDate: String, $passengers: Int, $type: String) {
                getFlights(departureCity: $departureCity, arrivalCity: $arrivalCity, departureDate: $departureDate, returnDate: $returnDate, passengers: $passengers, type: $type) {
                    id
                    departureCity
                    arrivalCity
                    departureDate
                    returnDate
                    passengers
                    price
                    type
                }
            }
        `;
        const variables = {
            departureCity,
            arrivalCity,
            departureDate,
            returnDate: returnDate || null,
            passengers: parseInt(passengers),
            type: flightType === 'one-way' ? 'One-way' : 'Return'
        };

        console.log('Generated query:', query);
        console.log('Query variables:', variables);
        try {
            const result = await fetchGraphQL(query, variables);
            console.log('Query result:', result);
            if (result.data.getFlights.length === 0) {
                await displayAlternativeDates(departureCity);
            } else {
                displayFlights(result.data.getFlights);
            }
        } catch (error) {
            console.error('Error fetching flights:', error);
        }
    });

    // Function to display flights in a pop-up
    function displayFlights(flights) {
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'results-container';
        
        // Clear previous content and add formatted flight cards
        resultsContainer.innerHTML = '';
        
        // Debugging: Log the flights array
        console.log('Flights array:', flights);
        
        if (flights.length === 0) {
            resultsContainer.innerHTML = '<h3>No flights available!</h3><p>Please adjust your search criteria.</p>';
        } else {
            flights.forEach(flight => {
                const flightCard = document.createElement('div');
                flightCard.className = 'flight-card';
                flightCard.innerHTML = `
                    <h4>Flight ID: ${flight.id}</h4>
                    <ul class="flight-details">
                        <li>Departure: ${flight.departureCity} on ${flight.departureDate}</li>
                        <li>Arrival: ${flight.arrivalCity}</li>
                        <li>${flight.returnDate ? 'Return Date: ' + flight.returnDate : 'One-way flight'}</li>
                        <li>Passengers: ${flight.passengers}</li>
                        <li>Price: $${flight.price}</li>
                        <li>Type: ${flight.type}</li>
                    </ul>
                    <button class="book-button">Book</button>
                `;
                // Add click listener for booking
                flightCard.querySelector('.book-button').addEventListener('click', () => bookFlight(flight));
                resultsContainer.appendChild(flightCard);
            });
        }
        
        // Create a close button and append it at the bottom of the results container
        const closeButton = document.createElement('button');
        closeButton.innerText = 'Close';
        closeButton.className = 'close-button';
        closeButton.addEventListener('click', () => document.body.removeChild(popUp));
        resultsContainer.appendChild(closeButton);
        
        const popUp = document.createElement('div');
        popUp.className = 'pop-up';
        popUp.appendChild(resultsContainer);
        
        document.body.appendChild(popUp);
    }

    // Updated function to fetch alternative dates using fetchGraphQL
    async function fetchAlternativeDates(departureCity) {
        const query = `
            query GetAlternativeDates($departureCity: String!) {
                getAlternativeDates(departureCity: $departureCity)
            }
        `;
        const variables = { departureCity };
        try {
            console.log('Generated query for alternative dates:', query);
            console.log('Query variables for alternative dates:', variables);
            const result = await fetchGraphQL(query, variables);
            console.log('Result for alternative dates:', result);
            return result.data.getAlternativeDates;
        } catch (error) {
            console.error('Error fetching alternative dates:', error);
            return [];
        }
    }

    // Updated function to display alternative available dates in a pop-up
    async function displayAlternativeDates(departureCity) {
        const alternativeDates = await fetchAlternativeDates(departureCity);
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'results-container';
        resultsContainer.innerHTML = `
            <h3>No flights available from ${departureCity}!</h3>
            <p>Check out these available flight dates:</p>
        `;
        
        const alternativeDatesSection = document.createElement('div');
        alternativeDatesSection.innerHTML = `
            <ul class="alternative-dates">
                ${alternativeDates.map(date => `<li>${date}</li>`).join('')}
            </ul>
        `;
        resultsContainer.appendChild(alternativeDatesSection);

        // Append a close button at the bottom
        const closeButton = document.createElement('button');
        closeButton.innerText = 'Close';
        closeButton.className = 'close-button';
        closeButton.addEventListener('click', () => document.body.removeChild(popUp));
        resultsContainer.appendChild(closeButton);

        const popUp = document.createElement('div');
        popUp.className = 'pop-up';
        popUp.appendChild(resultsContainer);
        document.body.appendChild(popUp);
    }

    // Add a new function to handle flight booking
    async function bookFlight(flight) {
        const mutation = `
            mutation BookFlight($departureCity: String!, $arrivalCity: String!, $departureDate: String!, $returnDate: String, $passengers: Int!, $type: String!) {
                bookFlight(departureCity: $departureCity, arrivalCity: $arrivalCity, departureDate: $departureDate, returnDate: $returnDate, passengers: $passengers, type: $type) {
                    id
                }
            }
        `;
        const variables = {
            departureCity: flight.departureCity,
            arrivalCity: flight.arrivalCity,
            departureDate: flight.departureDate,
            returnDate: flight.returnDate,
            passengers: flight.passengers,
            type: flight.type
        };
        try {
            const result = await fetchGraphQL(mutation, variables);
            if (result.data && result.data.bookFlight) {
                alert('Flight booked successfully! Flight ID: ' + result.data.bookFlight.id);
            } else {
                alert('Booking failed. Please try again.');
            }
        } catch (error) {
            console.error('Error booking flight:', error);
            alert('Error booking flight.');
        }
    }
});

