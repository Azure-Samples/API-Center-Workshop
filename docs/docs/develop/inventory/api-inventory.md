# Create an API Center Service

:::tip[Note]

This step uses the Azure API Center VS Code extension. If you haven't installed it yet, you can download it from [here](https://marketplace.visualstudio.com/items?itemName=AzureAPICenter.apicenter). Ensure you install and **switch to the Pre-Release** version for this workshop.

:::

Click on the **Extensions** icon in the side bar, and type 'api center' in the search textbox. Click on the Azure API Center extension and click Install **Install Pre-Release/ Install**
![API Center VS Code Extension](/img/apic-vscode-extension.jpg)

Once installed, click on the API Center icon on the side bar to sign in to your Azure account.

![Sign in to Azure via API Center Extension](/img/apic-signin-vscode.jpg)

Before you start using API Center, you need to check on the following in your subscription:
1. Ensure you at least have a _Contributor Role Assignment_
    - Log in to the Azure CLI (az) usin `az login`
    - Run `az role assignment list --assignee USER-ID --scope /subscriptions/SUBSCRIPTION-ID` to confirm your role assignments scoped to your subscription. _Replace USER-ID with your User Object ID and SUBSCRIPTION-ID with your subscription ID._
1. Register the _Microsoft.ApiCenter_ resource provider
    - To register your resource provider, run `az provider register --namespace Microsoft.ApiCenter`

Now, let's create an Azure API Center service in your subscription. You can create one directly on the Azure Portal, but we will load and use the **apic-extension** from the Azure CLI by running `az apic create --name APIC-NAME --resource-group RG-NAME --location LOCATION`

:::tip[Note]

Remember to replace _RG-NAME_ with the name of your resource-group. We'll use **contoso-airlines** as the _APIC-NAME_ and create it in **westeurope**

:::

If you click on the API Center extension again, and refresh, you will see your newly created API Center service. Once you expand the service, you will see a sample API, _Swagger Petstore_, created by default.

![API Center instance created](/img/swagger-petstore.jpg)

Next, we'll define some custom metadata properties to help organize our APIs.