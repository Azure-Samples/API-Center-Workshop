# Environments and Deployments

## Definitions
An **API Environment** is a location where an API runtime could be deployed. Each environment is aligned with a lifecycle stage and may also include information about developer portal or management interfaces.

A **Deployment** is a location/ address where users can access an API. An API can have multiple deployments, each with a specific API definition.

## Add an Environment
In API Center, you can add multiple environments to represent your real-world deployment scenarios. To add an environment, use the following command:

```bash
az apic environment create -g rg-apic-wrksp -n ev --title "Dev Environment" --type "development"
```

![Add an environment](/img/environment.jpg)

## Add a Deployment

_Coming Soon_