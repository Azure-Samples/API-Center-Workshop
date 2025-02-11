# Deploy to Azure

## 1. Deploy Service API to Azure App Service

Install the [App Service extension in Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice) to deploy the services API to Azure App Service. Once the extension is installed, click on the Azure icon in the Activity Bar, then select your subscription. Right-click on 'App Services' and select 'Create New Web App ... (Advanced)', then fill in the following:-

- Globally unique name for the web app: **contoso-airlines-services**
- Create a new resource group: **rg-contoso-airlines**
- Runtime stack: **Node 20 LTS**
- OS: **Linux**
- App Service plan: **Create new (contoso-airlines-service-plan)**
- Application Insights: **Skip for now**

Observe the 'Output' window in the terminal to see the deployment progress. Once the deployment is complete, you can click the provided link to your web app to view it in the browser.

![Create app service resource](/img/app-service-create.jpg)

After creating the web app, the next step is to deploy the API. Right-click on the web app and select 'Deploy to Web App ...', then select the folder containing the API code. The extension will deploy the API to the web app.

After a few minutes, refresh your web app in the browser, and navigate to /services to view the services.

[TODO]: Update from local to deployed in code

## 2. Deploy Petcompanion API to Azure Functions

Install the [Azure Functions extension in Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions) to deploy the petcompanion API to Azure Functions. Once the extension is installed, click on the Azure icon in the Activity Bar, then select your subscription. Right-click on 'Function App' and select 'Create new Function App in Azure ... (Advanved)', then fill in the following:-

- Globally unique name for the function app: **contoso-airlines-petcompanion**
- Hosting plan: **App Service Plan**
- Location: **West Europe**
- Runtime stack: **Node 20 LTS**
- OS: **Linux**
- Linux App Service plan: **contoso-airlines-service-plan**
- Resource group: **rg-contoso-airlines**
- Storage account: **Create new (contosoairlinespets)**
- Application Insights: **Skip for now**

Observe the 'Output' window in the terminal to see the deployment progress. Once the deployment is complete, you can click the provided link to your function app to view it in the browser.

![Create function app resource](/img/azure-functions-create.jpg)

The next step is to deploy the petcompanion API. Right-click on the function app and select 'Deploy to Function App ...', then select the folder containing the API code. The extension will deploy the API to the function app.