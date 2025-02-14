import { app } from '@azure/functions';
import { OpenAPIObjectConfig, registerOpenAPIHandler, registerSwaggerUIHandler } from '@apvee/azure-functions-openapi';

// Setup Azure Functions app configuration, with HTTP streaming enabled
app.setup({
    enableHttpStream: true,
});

// ✅ OpenAPI Configuration
const openAPIConfig: OpenAPIObjectConfig = {
    info: {
        title: 'Contoso Airlines Pet API',
        version: "1.0.0",
        description: "API for retrieving available pets for adoption at airports.",
        contact: {
            name: "Contoso Airlines",
            email: "support@contoso.com",
            url: "https://www.contoso.com"
        }
    },
    security: [],
    externalDocs: {
        description: "API Documentation",
        url: "https://www.contoso.com/docs"
    },
    tags: [{
        name: "Pets",
        description: "Operations related to pet adoption at airports",
        externalDocs: {
            description: "Learn more about our Pet Adoption Program",
            url: "https://www.contoso.com/pets"
        }
    }]
};

// Registers the OpenAPI handler, with no authentication required
const document = registerOpenAPIHandler("anonymous", openAPIConfig, "3.1.0", "json");

// ✅ Swagger UI Configuration
// Swagger UI will be available at /api/swagger-ui.html
registerSwaggerUIHandler("anonymous", 'api', [document]);