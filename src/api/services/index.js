import Fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import fastifyCors from '@fastify/cors';

// Initialize Fastify instance with logging enabled
const fastify = Fastify({ logger: true });

// Resolve __filename and __dirname for ES Module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Register CORS plugin to allow all origins
fastify.register(fastifyCors, {
    origin: '*', // Allow all origins
  });

// Swagger Setup: Register and configure Swagger documentation for the API
fastify.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'Contoso Airlines API',
            description: 'API for fetching services and other airline-related data',
            version: 'v1'
        },
        servers: [
            {
                url: 'http://localhost:8080',
                description: 'Development server'
            },
            {
                url: 'https://contoso-airlines-services.azurewebsites.net/',
                description: 'Azure Production server'
            }
        ],
        tags: [
            { name: 'services', description: 'Services operations' }
        ],
        paths: {
            '/services': {
                get: {
                    tags: ['services'],
                    summary: 'Get all services',
                    description: 'Returns all available airline services',
                    responses: {
                        '200': {
                            description: 'Successful response',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            services: {
                                                type: 'array',
                                                items: {
                                                    $ref: '#/components/schemas/Service'
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        components: {
            schemas: {
                Service: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        title: { type: 'string' },
                        description: { type: 'string' },
                        image: { type: 'string' }
                    }
                }
            }
        }
    },
    custom: {
        approver: 'johndoe@contoso.com',
        'compliance-review': 'Not Started'
    }
});

// Register Swagger UI to serve the interactive documentation interface
fastify.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false
    },
    staticCSP: true,
    transformStaticCSP: (header) => header
});

// Define the Services Endpoint to fetch all airline services
fastify.get('/api/services', {
    schema: {
        tags: ['services'],
        description: 'Get all airline services',
        response: {
            200: {
                description: 'Successful response',
                type: 'object',
                properties: {
                    services: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id: { type: 'integer' },
                                title: { type: 'string' },
                                description: { type: 'string' },
                                image: { type: 'string' }  
                            }
                        }
                    }
                }
            }
        }
    }
}, async () => {
    // Build the file path to the local JSON file containing services data
    const filePath = path.join(__dirname, 'data', 'services.json');
    // Read the file asynchronously and parse its JSON content
    const services = JSON.parse(await readFile(filePath, 'utf-8'));
    // Return the services data as JSON response
    return { services };
});

// Start Server: Set up the server to listen on specified port and host
const start = async () => {
  try {
    const port = process.env.PORT || 8080;
    await fastify.listen({ port, host: '0.0.0.0' }, () => console.log('SERVER LISTENING ON PORT: ', + port));
  } catch (err) {
    // Log any startup error and exit the process
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
