# API Design Conformance

API Governance is the practice of establishing and enforcing guidelines and standards for API design, development, and management. It ensures that APIs are consistent, secure, and easy to consume. API governance is essential for organizations that are building APIs to ensure that they are well-designed, secure, and easy to consume.

API Center allows your organization to shift-left API governance by enforcing API design conformance at the time of API creation. Contoso wants to adopt this approach to ensure that all APIs are created according to the organization's API design standards from the beginning, to avoid costly rework later.

## Define an API Style Guide

:::tip[Note]

To run shift-left API Design conformity checks in VS Code, API Center uses **Spectral** as the linting engine. To use this feature, you need to install the Spectral extension for VS Code. You can download it from [here](https://marketplace.visualstudio.com/items?itemName=stoplight.spectral).

:::

If you navigate to `resources/rulesets` folder, you will find a custom ruleset that extends the OpenAPI ruleset and adds a new rule. Click the `oas.yaml` ruleset file, to open and view in your current working directory.

![Custom ruleset](/img/oas.jpg)

- Open the Command Pallete on VS Code (Ctrl+Shift+P) and select `Azure API Center: Set Active API Style Guide` and hit Enter.
- Use `Select Local File` and navigate to the `resources/rulesets` folder and select the `oas.yaml` file. 

Once you've set the active API style guide, you immediately see errors in the API definition(s) that violate the rules defined in the style guide.

![API Design check errors](/img/api-design-errors-vscode.jpg)

Check the errors in the API definition(s) and fix them to conform to the API style guide.

:::tip[BONUS]

You can use GitHub Copilot to help you fix the errors faster.

![API Design check errors fix with GH Copilot](/img/gh-copilot-design-fix.jpg)

:::

### Deploy rulesets to API Center

:::tip[Note]

Ensure that you are on the *pre-release* version of the API Center VS Code extension to customize your ruleset.
:::

- Click on the API Center icon in the VS Code sidebar and click on `Profiles`.
- Expand `spectral-openapi` and open the `ruleset.yml` file.
- Then modify the `ruleset.yml` file to include the custom ruleset (You can copy the contents from the `oas.yaml` file).
- Save.
- Click on `spectral-openapi` and select `Deploy Rules to API Center`.
 ![Deploy rulesets to API Center](/img/deploy-rules.jpg)

## API Analysis

Once the rules are deployed, the API Center will enforce the rules defined in the custom ruleset for all APIs created in the API Center. To see the linting results, you can go on the Azure portal and view the report.

![API Design check errors in Azure portal](/img/services-analysis-report.jpg)