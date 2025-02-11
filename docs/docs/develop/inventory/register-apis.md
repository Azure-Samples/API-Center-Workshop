# Register your APIs

After creating your API Center, the next step is to start registering your APIs to build a centralized inventory. For each API, you will also add an API version with an API definition. 

## 1. Service API

- Visit the deployed API’s documentation (docs/json), and save the OpenAPI json definition (service-get.json)
- Click on the API Center extension, right click on `APIs` and select `Register API`
 
    - Manual
    - API Title: contoso-services
    - API Type: REST
    - Version: v1
    - Lifecycle: Development
    - API Definition title: openapi
    - Specification name: OpenAPI
    - Select file >> service-get.json

## 2. Pet Travel Companion API

Repeat the steps for the Pet Travel Companion API, and provide the following inputs:
 
    - Manual
    - API Title: contoso-pets
    - API Type: REST
    - Version: v1
    - Lifecycle: Design
    - API Definition title: openapi
    - Specification name: OpenAPI
    - Select file >> pets-get.json

![Registered services and pets APIs](/img/created-apis.jpg)