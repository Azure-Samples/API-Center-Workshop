# Import APIs from APIM

If you have your APIs in Azure API Management, you can import them into your centralized API Inventory on API Center to improve discoverability and make them accessibile to all developers. You will also learn to set up **automatic synchronization** by linking your API Management instance to API Center and this will ensure that your inventory is always up-to-date. 

## Get more sample APIs

First, let's get some additional sample APIs to complete the exercise. We'll use APIs from [APIs.guru](https://apis.guru/), but you can skip this step if you already have APIs you can use open in VS Code.

1. Fork the [openapi-directory](https://github.com/APIs-guru/openapi-directory/fork) repository into your github account.
1. Clone and open in VS Code.

    ![Fork, clone and opena api-guru repo](/img/api-guru.png)
1. The APIs directory should have more than 2000 APIs.

## Add APIs to Azure API Management

Create a new file in the root directory called `script.sh`, and paste in the following bash script to automate the import of APIs from the APIs folder into an Azure API Management instance.

:::tip[Note]

Add your `Subscription ID`, `Resource group name` and `resource name` values to their respective variables.

:::

```bash
#!/bin/bash# 
Set your variables

subscriptionId="<SUBSCRIPTION-ID>" 
resourceGroup="<RESOURCE-GROUP-NAME>"
serviceName="<APIM-RESOURCE-NAME>"

# Directory of the local clone of the openapi-directory repository
base_dir=$(pwd)

# This is a comment
echo "Registering all the specs in the openapi-directory repository to API Management"

# Check if already logged in

if ! az account show > /dev/null 2>&1; then
    az login
fi

# Set the subscription
az account set --subscription $subscriptionId

# Echo the currently set subscription
subscription=$(az account show --query "{subscriptionId:id, subscriptionName:name}")
echo "Currently set subscription: $subscription"

# Find all .yaml files in the base directory and its subdirectories
for file in $(find $base_dir -type f -name "*.yaml"); do
    # Echo the file name
    echo "Importing file: $file"        
    
    # Remove the prefix up to APIs/    
    ApiPath=${file#*APIs/}    
    
    # Replace all / with empty string    
    ApiPath=${ApiPath//\//}    
    
    # Replace . with empty string    
    ApiPath=${ApiPath//./}    
    echo  "API path: $ApiPath"  
    
    # This will output: adyencomAccountService4    
    # Run the az command and echo its output    
    output=$(az apim api import --path $ApiPath --resource-group $resourceGroup --service-name $serviceName --specification-path $file --specification-format OpenApi )    
    echo $output    
    
    # Add a line break    
    echo ""
done
```

Open your terminal and run the script using `bash script.sh`. Give it a few minutes to finish importing all the APIs.

![Run bash script to import APIs to APIM](/img/run-bash.png)

When you open API Management, you will see all the imported APIs

![APIs imported into APIM](/img/apim-apis.png)

## Import from API Management

The process of synchronizing (linking) API Management to API Center completes the following actions:
- All your APIs in API Management will be added into API Center
- An environment will be created of type _Azure API Management_
- A deployment will be created and associated for each API definition

Steps:

1. Run `az apic update -n APIC-NAME -g RG-NAME --identity '{"type": "SystemAssigned"}'` to enable managed identity in your API Center
1. Assign the API Management Service Reader role
    - Get and save the principal ID using `apicObjID=$(az apic show -n APIC-NAME -g RG-NAME --query "identity.principalId" --output tsv)`
    - Get and save the resource ID of the API Management instance using `apimID=$(az apim show -n APIM-NAME -g RG-NAME --query "id" --output tsv)`
    - Assign the **API Management Service Reader role** to your managed identity using `scope="${apimID:1}"` then `az role assignment create --role "API Management Service Reader Role" --assignee-object-id $apicObjID --assignee-principal-type ServicePrincipal --scope $scope`
1. Integrate API Management into API Center using `az apic integration create apim -g RG-NAME -n APIC-NAME --integration-name INTEGRATION-NAME --azure-apim APIM-NAME`

Navigate to your `Environments` on the Azure portal, and switch to `Integrations (Preview)` to view your newly created link, and confirm the State is `Linked and syncing`.

![APIM linked to APIC](/img/apim-apic-link.png)

Now, all APIs will be automatically imported into the inventory, and any updates on API Management will sync out of the box, ensuring all your APIs are accessible and up-to-date.

![APIs from the linked APIM](/img/imported-apis.png)