# Run in Local Environment

First, let us run the application in a local environment. This will help us understand how the application works and how the different components interact with each other.

:::tip[Note]

Jump to the **'Start the APIs'** section if you are running in a Codespace.

:::


Fork the repository and clone it to your local machine. 

```bash
git clone 
```

[TODO: Add the repository link]

[TODO: Add install requirements]

## Start the APIs

1. Services API
    - Navigate to `src/api/services` and run `node index.js` in the terminal.
    - Navigate to `http://localhost:8080/services` to view the services
    ![Service API running locally](/img/service-api-local.jpg)

2. Pet Travel Companion API
    - Start the debugger (Attach to Node Functions) to run the Azure functions API locally.
    - Navigate to `http://localhost:7071/api/pets-get` to view the pets
    ![Pet Travel Companion API running locally](/img/pet-companion-api-local.jpg)

## Start the Client

Navigate to `src/client` and right click on the `index.html` file to `Open with Live Server`

![Contoso Airlines Homepage](/img/website.jpg)

