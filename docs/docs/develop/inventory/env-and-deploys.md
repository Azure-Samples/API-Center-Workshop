# Environments and Deployments

An **API Environment** is a location where an API runtime could be deployed. Each environment is aligned with a lifecycle stage and may also include information about developer portal or management interfaces.

A **Deployment** is a location/ address where users can access an API. An API can have multiple deployments, each with a specific API definition.

## Add an Environment
In API Center, you can add multiple environments to represent your real-world deployment scenarios. Let's add a Dev environment for our APIs, by running `az apic environment create -g RG-NAME -n APIC-NAME --title Contoso-Dev --environment-id contoso-dev --type development`

Let's also create:
- **Testing**, `az apic environment create -g RG-NAME -n APIC-NAME --title Contoso-Test --environment-id contoso-test --type testing` and
- **Production**, `az apic environment create -g RG-NAME -n APIC-NAME --title Contoso-Prod --environment-id contoso-prod --type production` environments.

:::tip[Note]

Remember to replace _RG-NAME_ with the name of your resource-group and _APIC-NAME_ with the name of your API Center.

:::

Your newly created environments should show up under the **Environments** section of your API Center.

![Add an environment](/img/environment.jpg)

## Add a Deployment

Now, you'll add a deployment by associating your APIs with the environments you created in the step above, as below:

- Create deployments for the services & petsCompanion APIs, associated with the Dev environment: `az apic api deployment create -g RG-NAME -n APIC-NAME --deployment-id "v1-services-deployment" --title "V1 Services Deployment" --description "Version 1 of the Contoso services deployment." --api-id contoso-airlines-services --environment-id "/workspaces/default/environments/contoso-dev" --definition-id "/workspaces/default/apis/contoso-airlines-services/versions/v1/definitions/contoso-airlines-services" --server '{"runtimeUri":["DOMAIN"]}'`
- `az apic api deployment create -g RG-NAME -n APIC-NAME --deployment-id "v1-pets-deployment" --title "V1 Pets Deployment" --description "Version 1 of the Contoso pets deployment." --api-id contoso-airlines-pets --environment-id "/workspaces/default/environments/contoso-dev" --definition-id "/workspaces/default/apis/contoso-airlines-pets/versions/v1/definitions/contoso-airlines-pets" --server '{"runtimeUri":["DOMAIN"]}'`

:::tip[Note]

Remember to replace _RG-NAME_ with the name of your resource-group, _APIC-NAME_ with the name of your API Center and _DOMAIN_ with the domains of your deployed APIs respectively.

If you used different names and IDs for your environments in the previous step, ensure you update them in the command before executing

:::

Now, if you refresh your API Center and expand the Deployment section for each API, you should find the 2 deployments.

![Add a deployment](/img/deployments.jpg)

We will now jump into how you can govern your organizational APIs with API Center.