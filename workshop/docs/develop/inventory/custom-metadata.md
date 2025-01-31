# Define Custom Metadata

Before importing your APIs, you want to define custom metadata to further organize and control all APIs. In this case, Contoso Airlines requires that all their APIs have a single contact person in charge of approving the API (Approver). It is also required that all APIs belong to one of the defined compliance review stages _(Not Started, In progress, Completed)._

Run the following commands to create the custom metadata:

```bash
az apic metadata create --resource-group rg-apic-wrksp --service-name contoso-air --metadata-name "Approver" --schema '{"type":"string","title":"Approver"}' --assignments '[{entity:api,required:true,deprecated:false},{entity:environment,required:true,deprecated:false}]'
```

![Approver custom metadata](/img/approver-metadata.jpg)

```bash
az apic metadata create -g rg-apic-wrksp -n contoso-air --metadata-name "compliance-review" --schema '{"type":"string","title":"Compliance Review", "oneOf":[{"const":"Not Started","description":""},{"const":"In Progress","description":""},{"const":"Completed","description":""}]}' --assignments '[{entity:api,required:true,deprecated:false},{entity:environment,required:true,deprecated:false}]'
```

![Compliance Review custom metadata](/img/compliance-metadata.jpg)