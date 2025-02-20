targetScope = 'subscription'

@minLength(1)
@maxLength(64) 
@description('Name of the environment that can be used as part of naming resource convention')
param environmentName string

param resourceGroupName string = 'rg-${environmentName}'

@minLength(1)
@description('Primary location for all resources')
param location string

param staticWebAppName string = 'website'
param appServiceName string = 'serviceapi'
param functionAppName string = 'petsapi'

@description('Id of the user or app to assign application roles')
param principalId string = ''

@description('Location for the Static Web App')
@allowed(['westus2', 'centralus', 'eastus2', 'westeurope', 'eastasia', 'eastasiastage'])
@metadata({
  azd: {
    type: 'location'
  }
})
param webappLocation string // Set in main.parameters.json

// ---------------------------------------------------------------------------
// Common variables
var petsApiResourceName = '${abbrs.webSitesFunctions}petsapi-${resourceToken}'
var serviceApiResourceName = '${abbrs.webSitesFunctions}serviceapi-${resourceToken}'
var storageAccountName = '${abbrs.storageStorageAccounts}${resourceToken}'

var tags = {
  'azd-env-name': environmentName
}
var resourceToken = toLower(uniqueString(subscription().id, environmentName, location))
var abbrs = loadJsonContent('abbreviations.json')

@description('Whether the deployment is running on GitHub Actions')
param runningOnGh string = ''

@description('Whether the deployment is running on Azure DevOps Pipeline')
param runningOnAdo string = ''

// Figure out if we're running as a user or service principal
var principalType = empty(runningOnGh) && empty(runningOnAdo) ? 'User' : 'ServicePrincipal'

// ✅ Resource Group
resource rg 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: !empty(resourceGroupName) ? resourceGroupName : '${abbrs.resourcesResourceGroups}${environmentName}'
  location: location
  tags: tags
}

// ✅ Azure Static Web App - website
module site 'br/public:avm/res/web/static-site:0.7.0' = {
  name: 'webapp'
  scope: rg
  params: {
    name: staticWebAppName
    location: webappLocation
    sku: 'Free'
    tags: union(tags, { 'azd-service-name': staticWebAppName })
    provider: 'Custom'
  }
}

// ✅ Azure App Service - serviceapi
module appservice 'br/public:avm/res/web/site:0.13.3' = {
  name: 'serviceapi'
  scope: rg
  params: {
    // Required parameters
    tags: union(tags, { 'azd-service-name': appServiceName })
    kind: 'app,linux'
    name: serviceApiResourceName
    serverFarmResourceId: appServicePlan.outputs.resourceId
  }
}

// ✅ Azure App Service Plan - serviceapi (App service) and petsapi (Azure function)
module appServicePlan 'br/public:avm/res/web/serverfarm:0.4.1' = {
  name: 'appserviceplan'
  scope: rg
  params: {
    name: '${abbrs.webServerFarms}${resourceToken}'
    tags: tags
    location: location
    skuName: 'B1'
    reserved: true
  }
}

// ✅ Azure Function - petsapi
module function 'br/public:avm/res/web/site:0.13.0' = {
  name: 'petsapi'
  scope: rg
  params: {
    tags: union(tags, { 'azd-service-name': functionAppName })
    location: location
    kind: 'functionapp'
    name: petsApiResourceName
    serverFarmResourceId: appServicePlan.outputs.resourceId
    managedIdentities: { systemAssigned: true }
    siteConfig: {
      minTlsVersion: '1.2'
      ftpsState: 'FtpsOnly'
    }
    appSettingsKeyValuePairs: {
      AzureFunctionsJobHost__logging__logLevel__default: 'Trace'
      FUNCTIONS_EXTENSION_VERSION: '~4'
      FUNCTIONS_WORKER_RUNTIME: 'node'
    }
    storageAccountResourceId: storage.outputs.resourceId
    storageAccountUseIdentityAuthentication: true
  }
}

module storage 'br/public:avm/res/storage/storage-account:0.15.0' = {
  name: 'storage'
  scope: rg
  params: {
    name: storageAccountName
    tags: tags
    location: location
    skuName: 'Standard_LRS'
    allowSharedKeyAccess: false
    networkAcls: {
      defaultAction: 'Deny'
      bypass: 'AzureServices'
    }
    blobServices: {
      containers: [
        {
          name: petsApiResourceName
        }
      ]
    }
    roleAssignments: [
      {
        principalId: principalId
        principalType: principalType
        roleDefinitionIdOrName: 'Storage Blob Data Contributor'
      }
    ]
  }
}

// ---------------------------------------------------------------------------
// System roles assignation

module storageRoleApi 'br/public:avm/ptn/authorization/resource-role-assignment:0.1.2' = {
  scope: rg
  name: 'storage-role-api'
  params: {
    principalId: function.outputs.systemAssignedMIPrincipalId
    roleName: 'Storage Blob Data Contributor'
    roleDefinitionId: 'b7e6dc6d-f1e8-4753-8033-0f276bb0955b'
    resourceId: storage.outputs.resourceId
  }
}

output AZURE_LOCATION string = location
output AZURE_TENANT_ID string = tenant().tenantId
output AZURE_RESOURCE_GROUP string = rg.name

output WEBSITE_URL string = site.outputs.defaultHostname
output WEBAPP_URL string = appservice.outputs.defaultHostname
output FUNCTIONAPP_URL string = function.outputs.defaultHostname


