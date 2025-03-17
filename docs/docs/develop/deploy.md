# Deploy to Azure

To run this sample, you first need to provision the Azure resources needed and deploy the sample. **Start Docker Desktop** (install it if not already installed)

Open a terminal and run the following command to download the project code:

```shell
azd init -t Azure-Samples/API-Center-Workshop
```

:::tip[Note]

This command will initialize a git repository, so you do not need to clone this repository.

:::

Login to your Azure account:

```shell
azd auth login
```

Create a new azd environment:

```shell
azd env new
```

Enter a name that will be used for the resource group.
This will create a new folder in the `.azure` folder, and set it as the active environment for any calls to `azd` going forward.

Provision the infrastructure needed to run the application.

```shell
azd provision
```

:::tip[Important]

This application specifically requires some environment variables to be available during the packaging phase. This is why we need to provision the infra first before packaging and deploying the app. In most cases, simply running 'azd up' will package, provision and deploy your apps.

:::

![azd provision output example](/img/azd-provision.png)

Package and deploy the app to Azure:

```shell
azd package
```
```shell
docker login -u USERNAME
```
Paste your docker password when prompted

```shell
azd deploy
```

After the application has been successfully deployed you will see a few URLs printed to the console. Click on the `service website Endpoint` to interact with the website in your browser.

![Website endpoint url example](/img/website-endpoint.png)
