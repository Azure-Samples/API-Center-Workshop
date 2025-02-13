# Detect Breaking Changes

Deploying APIs is a continuous process, and as APIs evolve, they may introduce breaking changes that can impact consumers. It is essential to detect these breaking changes early in the API lifecycle to avoid disruptions to consumers and ensure a seamless transition to the new API version.

The Azure API Center extension for Visual Studio Code provides a feature to easily detect breaking changes between different versions of an OpenAPI specification documents.

:::tip[Note]

The breaking change detection feature uses [Optic](https://github.com/opticdev/optic) under the hood. Run `npm install -g @useoptic/optic` to install.  

:::

- Open the Command Pallete on VS Code (Ctrl+Shift+P) and select `Azure API Center: Detect Breaking Changes` and hit Enter.
- You will be prompted to select the two OpenAPI specification files that you want to compare, (one after the other).

Once you've selected the two files, Optic will analyze the changes and provide a diff view highlighting the breaking changes between the two versions. You can review the changes and take necessary actions to address the breaking changes before deploying the new API version.

![Breaking changes](/img/breaking-changes.png)