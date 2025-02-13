# Register your APIs

Now, its time to start registering your organiational APIs to build a centralized inventory. You can continue using the Azure CLI apic-extension, but for now, let's use the VS Code extension.

To complete registering an API, you will be required to provide an OpenAPI definition file. We'll tap into the power of GitHub Copilot, your AI-Pair programmer, to help us generate an OpenAPI definition from our code.

## Generate OpenAPI Spec with GitHub Copilot
GitHub Copilot will analyze the API code and create an OpenAPI definition. Open the API Code by navigating to `src/api/services/index.js`. With your cursor on the file, Right click, expand **Copilot** and click on **Generate API Documentation.**

![Generate OpenAPI Spec](/img/generate-openapi.jpg)

Take some time to review the specification file to check on accuracy, then save the file (yaml) to use in the registration step.

## Register APIs

To register a new API, click on the API Center icon on the side bar, right click on `APIs`,  select `Register API` and follow the prompts. Alternatively, you can open the Command Pallete (Ctrl + Shift + P), type **Azure API Center: Register API**, hit **Enter** and follow the prompts

### 1. Service API
 
    - Register API: _**Manual**_
    - API Title: _**Contoso Airlines Services**_
    - API Type: _**REST**_
    - Version: _**v1**_
    - Lifecycle: _**Development**_
    - API Definition title: _**Contoso Airlines Services**_
    - Specification name: _**OpenAPI**_
    - Select file >> `contoso-services.yaml`

:::tip[Note]

Do the same for the other API:
### 2. Pet Travel Companion API

1. Generate an OpenAPI Spec file with GitHub Copilot.
1. Register to API Center
    - Register API: _**Manual**_
    - API Title: _**Contoso Airlines Pets**_
    - API Type: _**REST**_
    - Version: _**v1**_
    - Lifecycle: _**Design**_
    - API Definition title: _**Contoso Airlines Pets**_
    - Specification name: _**OpenAPI**_
    - Select file >> `contoso-pets.yaml`
:::

Once you have added the APIs, refresh your API Center and they should both show up on the list of APIs.

![Registered services and pets APIs](/img/created-apis.jpg)

## View API Documentation

Once you have registered your API, assigned a version and provided a definition, you can view the API Documentation directly in VS Code. Click on the API, expand the **Versions**, then *Definitions* and right click on the OpenAPI definition file and choose **Open API documentation**.

![View API documentation](/img/view-docs-vscode.jpg)

Next, we'll augment our inventory of APIs by adding some information about environments and deployments.