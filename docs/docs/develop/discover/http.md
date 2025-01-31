# Test APIs using HTTP requests

You can test your APIs by sending HTTP requests and inspecting the responses directly on VS Code, without writing any code. API Center allows you to instantly view a .http file that contains the HTTP requests for the API, and you can send these requests to test the API.

 :::tip[Note]

This functionality is powered by the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension for Visual Studio Code. If you don't have it installed, you will be prompted to install it when you try to send an HTTP request.

:::

Click on the API you are interested in, expand the `Versions`, then `Definitions` and right click on the `OpenAPI` definition file to `Generate HTTP file`.

On the .http file, you can see the HTTP requests for the API. You can send these requests by clicking on the `Send Request` button right on top of each request.

![Test APIs using HTTP requests](/img/http-file.jpg)