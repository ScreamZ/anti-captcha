<h1 align="center">
  AntiCaptcha
  <br>
  <br>
</h1>

<h4 align="center">Modern NodeJS API wrapper for Anticaptcha service</h4>

<p align="center">
  <a href="https://www.typescriptlang.org"><img src="https://anti-captcha.com/images/mainpage/herofront_nocape.png" alt="Anticaptcha Logo"></a>
</p>
<br>

This library is a NodeJS wrapper that expose an modern API in order to exploit the https://anti-captcha.com/ service.

Please keep in mind that this is a work in progress and it only support Proxyless Recaptcha breaker at the moment.


## Documentation
Install using either `yarn add anticaptcha` or `npm i anticaptcha`.

For the example, we will use the nice feature that are [ES7 Async Function](https://developers.google.com/web/fundamentals/primers/async-functions) this will make the syntax more concise, but feel free to use good old Promises.

**Caution** : Keep in mind that real people are working behind the network to break the hash. This can lead to some delay depending on the service charge's load, therefore you might require to set a greater timeout for your calls if you're using this through an REST API.

```javascript
// main.js
import { AntiCaptcha } from "anticaptcha";

// Registering the API Client.
const AntiCaptchaAPI = new AntiCaptcha("<your_client_ID>"); // You can pass true as second argument to enable debug logs.

const mainProcess = async () => {
    // Checking the account balance before creating a task. This is a conveniance method.
    if (await !AntiCaptchaAPI.isBalanceGreaterThan(10)) {
        // You can dispatch a warning using mailer or do whatever.
        console.warn("Take care, you're running low on money !")
    }

    // Creating a task to resolve.
    const taskId = await AntiCaptchaAPI.createTask(
        "http://www.some-site.com", // The page where the captcha is
        "7Lfh6tkSBBBBBBGN68s8fAVds_Fl-HP0xQGNq1DK", // The data-site-key value
    )

    // Waiting for resolution and do something
    const response = await AntiCaptchaAPI.getTaskResult(taskId);
}

```

The response object looks like this, feel free to check Typescript definition file that are given. This will give you nice view of the object properties.

```typescript
 {
    status: "ready" | "processing";
    solution: { gRecaptchaResponse: string };
    cost: number;
    ip: string;
    createTime: number;
    endTime: number;
    /**
     * Number of workers who tried to complete your task
     *
     * @type {number}
     * @memberof IGetTaskResponse
     */
    solveCount: number;
 }
```