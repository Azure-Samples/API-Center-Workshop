# Define Custom Metadata

Here, we are going to define custom metadata properties to further organize and control all organizational APIs, while enabling operations like filtering and searching through available and registered APIs. 

API Admins at Contoso Airlines strongly recommend that the teams producing APIs within the company ensure that each of them:
1. Has an assigned **approver**, who will also be the single contact person for the API.
1. Is assigned to one of the defined **compliance review** stages _(Not Started, In progress, Completed)._

You can define the approver metadata by running ```az apic metadata create -g RG-NAME -n APIC-NAME --metadata-name "Approver" --schema '{"type":"string","title":"Approver"}' --assignments '[{entity:api,required:false,deprecated:false},{entity:environment,required:false,deprecated:false}]'```

:::tip[Note]

Remember to replace _RG-NAME_ with the name of your resource-group and _APIC-NAME_ with the name of your API Center.

:::

Let's run a similar command for the compliance-review metadata - ```az apic metadata create -g RG-NAME -n APIC-NAME --metadata-name "compliance-review" --schema '{"type":"string","title":"Compliance Review", "oneOf":[{"const":"Not Started","description":""},{"const":"In Progress","description":""},{"const":"Completed","description":""}]}' --assignments '[{entity:api,required:false,deprecated:false},{entity:environment,required:false,deprecated:false}]'```

You will get a confirmation on your terminal once the properties are added successfully, but you can also open the API Center service on the Azure Portal to view your list of custom metadata.

![Custom metadata created](/img/custom-metadata.jpg)

With both built-in and custom defined properties, API Admins can easily filter through, sort and manage APIs, across multiple dimensions cutting across the whole organization. Example, **filter APIs of type X**, or **filter APIs currently in Design**, or **filter all APIs under engineer x** and more.

![Custom metadata created](/img/manage-apis-through-properties.gif)

Next, we will start registering APIs into our API Center.