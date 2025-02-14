# The Architecture

![Architecturue](/img/architecture.jpg)

This application is made from multiple components:
- **Frontend (Azure Static Web Apps):**
    - **Entry Point:** `src/client/index.html`
    - **Description:** A static HTML page augmented by CSS and JavaScript to dynamically load API data and render content.

- **API Layer:**
    - **Flights API (Azure Container Apps):**
        - **Entry Point:** `src/api/flights/index.js`
        - **Description:** A GraphQL API that serves available flights data to the client. 
        ![Flights section](/img/flights.png)

    - **Services API (Azure App Service):**
        - **Entry Point:** `src/api/services/index.js`
        - **Description:** A RESTful API that provides services to the client.
        ![Services section](/img/services.png)

    - **PetTravelCompanions API (Azure Functions):**
        - **Entry Point:** `src/api/petTravelCompanions/src/functions/pet-get.ts`
        - **Description:** A RESTful API that serves available pets for travel data to the client.
        ![Pets section section](/img/pets.png)
