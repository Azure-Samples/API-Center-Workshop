import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { registerFunction } from "@apvee/azure-functions-openapi";

// Define the Pet interface with the structure of the data to be returned
interface Pet {
    id: number;
    name: string;
    species: string;
    age: number;
    description: string;
    image: string;
    airport_code: string;
}

// Sample data for pets
const pets: Pet[] = [
    {
        id: 1,
        name: "Buddy",
        species: "Dog",
        age: 2,
        description: "A friendly Golden Retriever.",
        image: "https://images.unsplash.com/photo-1612774412771-005ed8e861d2?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        airport_code: "JFK"
    },
    {
        id: 2,
        name: "Whiskers",
        species: "Cat",
        age: 1,
        description: "A playful Siamese kitten.",
        image: "https://images.unsplash.com/photo-1554344056-db448228ded7?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        airport_code: "LAX"
    },
    {
        id: 3,
        name: "Chirpy",
        species: "Parrot",
        age: 3,
        description: "A colorful and talkative parrot.",
        image: "https://images.unsplash.com/photo-1714993654469-5224dd8670dc?q=80&w=2489&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        airport_code: "ORD"
    },
    {
        id: 4,
        name: "Luna",
        species: "Rabbit",
        age: 2,
        description: "A gentle and fluffy brown rabbit.",
        image: "https://images.unsplash.com/photo-1589952283406-b53a7d1347e8?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        airport_code: "ATL"
    },
    {
        id: 5,
        name: "Spike",
        species: "Hedgehog",
        age: 1,
        description: "A curious little hedgehog who loves to explore.",
        image: "https://images.unsplash.com/photo-1534278931827-8a259344abe7?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        airport_code: "DFW"
    },
    {
        id: 6,
        name: "Bubbles",
        species: "Fish",
        age: 1,
        description: "A vibrant betta fish that loves to swim around.",
        image: "https://images.unsplash.com/photo-1537801528273-77cbf9ee609b?q=80&w=2352&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        airport_code: "MIA"
    }
];

// Function to handle GET requests for pets data
export async function petsGet(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`HTTP function processed request for URL "${request.url}"`);

    try {
        context.log("Returning pets data...");
        return {
            status: 200,
            jsonBody: pets,
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (error) {
        context.log(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        context.log(`Stack Trace: ${error instanceof Error ? error.stack : 'No stack trace available'}`);
        return {
            status: 500,
            jsonBody: { error: "Failed to retrieve pets data." },
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
}

// Register function with swagger docs
registerFunction(
    'petsGet',
    'Get all pets', {
    handler: petsGet,
    methods: ['GET'],
    authLevel: 'anonymous',
    tags: ['Pets'],
    description: 'Get a list of pets available for adoption at airports.',
    operationId: 'petsGet',
    route: 'pets-get',
    azureFuntionRoutePrefix: 'api',
    parameters: [],
    responses: {
        200: {
            description: 'Success',
            content: {
                'application/json': {
                    schema: {
                        type: 'array',
                        items: {
                            type: 'array',
                            properties: {
                                id: { type: 'number' },
                                name: { type: 'string' },
                                species: { type: 'string' },
                                age: { type: 'number' },
                                description: { type: 'string' },
                                image: { type: 'string' },
                                airport_code: { type: 'string' }
                            }
                        }
                    }
                }
            }
        },
        500: {
            description: 'Internal Server Error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            error: { type: 'string' }
                        }
                    }
                }
            }
        }
    }
});


