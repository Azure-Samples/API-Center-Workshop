# Build an API Inventory


## Create an Azure API Center instance

:::tip[Note]

This step uses the Azure API Center VS Code extension. If you haven't installed it yet, you can download it from [here](https://marketplace.visualstudio.com/items?itemName=AzureAPICenter.apicenter).

:::

![API Center VS Code Extension](/img/apic-vscode-extension.jpg)

Click on the API center icon on the side bar and sign in to your Azure account

![Sign in to Azure via API Center Extension](/img/apic-signin-vscode.png)

[TODO: Add better image]

Open your terminal, and sign in to your Azure account.

```bash    
az login
```

Register the Microsoft.ApiCenter resource provider in your subscription. You only need to register the resource provider only once, and you can do this by running the command below:

```bash
az provider register --namespace Microsoft.ApiCenter
```

Create an API Center instance by running the following command:

```bash
az apic create --name contoso-air --resource-group rg-apic-workshop --location westeurope
```
![Create an API Center instance](/img/create-apic-cli.jpg)

If you open the API Center extension again, you will see your newly created instance with a sample Petstore API.

![API Center instance created](/img/swagger-petstore.jpg)
