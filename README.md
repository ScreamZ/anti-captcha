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

Please keep in mind that this is a work in progress and it only supports certain tasks types. Pull requests welcome!

## Documentation

Install using either `yarn add anticaptcha` or `npm i anticaptcha`.

For the example, we will use the nice feature that are [ES7 Async Function](https://developers.google.com/web/fundamentals/primers/async-functions) this will make the syntax more concise, but feel free to use good old Promises.

**Caution** : Keep in mind that real people are working behind the network to break the hash. This can lead to some delay depending on the service charge's load, therefore you might require to set a greater timeout for your calls if you're using this through an REST API.

```typescript
// main.js
import {
  AntiCaptcha,
  AntiCaptchaError,
  ErrorTypes,
  INoCaptchaTaskProxyless,
  INoCaptchaTaskProxylessResult,
  QueueTypes,
  TaskTypes
} from "anticaptcha";

// Registering the API Client.
const AntiCaptchaAPI = new AntiCaptcha("<your_client_ID>"); // You can pass true as second argument to enable debug logs.

const mainProcess = async () => {
  try {
    // Checking the account balance before creating a task. This is a conveniance method.
    if (!(await AntiCaptchaAPI.isBalanceGreaterThan(10))) {
      // You can dispatch a warning using mailer or do whatever.
      console.warn("Take care, you're running low on money !");
    }

    // Get service stats
    const stats = await this.getQueueStats(QueueTypes.RECAPTCHA_PROXYLESS);

    // Creating nocaptcha proxyless task
    const taskId = await AntiCaptchaAPI.createTask<INoCaptchaTaskProxyless>({
      type: TaskTypes.NOCAPTCHA_PROXYLESS,
      websiteKey: "7Lfh5tkSBBBFGBGN56s8fAVds_Fl-HP0xQGNGFDK", // Some key from website
      websiteURL: "http://www.some-site.com" // Some URL from website
    });

    // Waiting for resolution and do something
    const response = await AntiCaptchaAPI.getTaskResult<
      INoCaptchaTaskProxylessResult
    >(taskId);

    console.log(`Response Code: ${response.solution.gRecaptchaResponse}`);
  } catch (e) {
    if (
      e instanceof AntiCaptchaError &&
      e.code === ErrorCodes.ERROR_IP_BLOCKED
    ) {
      // do something...
    }
  }
};
```

When calling `createTask` or `getTaskResult` you'll need to specify the task type. Check the TypeScript definition file that are given. This will give you nice view of the object properties. The following tasks are currently supported (other types are defined at: https://anticaptcha.atlassian.net/wiki/spaces/API/pages/5079084/Captcha+Task+Types):

- `IImageToTextTask` (result type `IImageToTextTaskResult`)
- `INoCaptchaTaskProxyless` (result type `INoCaptchaTaskProxylessResult`)
- `IRecaptchaV3TaskProxyless` (result type `IRecaptchaV3TaskProxylessResult`)

```typescript
{
  status: "ready" | "processing";
  solution: T;
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
