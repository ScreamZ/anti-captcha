import { ApiResponse, ApisauceInstance, create } from "apisauce";
import { LanguagePoolTypes, QueueTypes, TaskStatus, TaskTypes } from "./enum";
import { AntiCaptchaError } from "./error";
import {
  ICreateTaskResponse,
  IGetBalanceResponse,
  IGetQueueStatsResponse,
  IGetTaskResultResponse
} from "./interfaces";

export class AntiCaptcha {
  private api: ApisauceInstance;
  private debug: boolean;

  /**
   * Creates an instance of AntiCaptcha.
   *
   * @param {strig} clientKey - The client key provided in your admin panel.
   * @param {boolean} [debugMode=false] - Whether you want to get debug log in the console.
   * @memberof AntiCaptcha
   */
  constructor(clientKey: string, debugMode = false) {
    this.api = create({
      baseURL: "https://api.anti-captcha.com"
    });
    this.debug = debugMode;

    // Auto-fill client key on each request.
    this.api.addRequestTransform(request => {
      if (!request.data) {
        request.data = { clientKey };
      } else {
        request.data.clientKey = clientKey;
      }
    });
  }

  /**
   * Get queue stats
   */
  public async getQueueStats(
    queueType: QueueTypes
  ): Promise<IGetQueueStatsResponse> {
    const response = (await this.api.post("getQueueStats", {
      queueId: queueType
    })) as ApiResponse<IGetQueueStatsResponse>;
    return response.data;
  }

  /**
   * Get the account balance.
   */
  public async getBalance() {
    const response = (await this.api.post("getBalance")) as ApiResponse<
      IGetBalanceResponse
    >;
    if (response.ok && response.data.errorId === 0) {
      return response.data.balance;
    }

    throw new AntiCaptchaError(
      response.data.errorCode,
      response.data.errorDescription
    );
  }

  /**
   * Helper method to check whether the account balance is greater than the given amount.
   *
   * @param {number} amount - The amount to compare.
   */
  public async isBalanceGreaterThan(amount: number) {
    return (await this.getBalance()) > amount;
  }

  /**
   * Dispatch a task creation to the service. This will return a taskId.
   *
   * @param {string} task - Task to perform
   * @param {string} websiteKey - The value of the "data-site-key" attribute.
   * @param {string} languagePool - The language pool. Default to English if not provided.
   *
   * @memberof AntiCaptcha
   */
  public async createTask<T>(
    task: T,
    languagePool: LanguagePoolTypes = LanguagePoolTypes.ENGLISH
  ) {
    const response = (await this.api.post("createTask", {
      languagePool,
      task
    })) as ApiResponse<ICreateTaskResponse>;

    if (response.ok && response.data.errorId === 0) {
      return response.data.taskId;
    }
    throw new AntiCaptchaError(
      response.data.errorCode,
      response.data.errorDescription
    );
  }

  /**
   *
   * @param {string} websiteURL - The URL where the captcha is defined.
   * @param {string} websiteKey - The value of the "data-site-key" attribute.
   * @param {string} languagePool - The language pool. Default to English if not provided.
   * @param {number} minScore - minimum score you want to get
   * @param {string} pageAction - the action name is defined by the website owner
   * @returns {Promise<number>}
   * @memberof AntiCaptcha
   */
  public async createTaskRecaptchaV3Proxyless(
    websiteURL: string,
    websiteKey: string,
    minScore: number,
    pageAction: string,
    languagePool: string = "en"
  ) {
    const response = (await this.api.post("createTask", {
      languagePool,
      task: {
        minScore,
        pageAction,
        type: TaskTypes.RECAPTCHA_PROXYLESS,
        websiteKey,
        websiteURL
      }
    })) as ApiResponse<ICreateTaskResponse>;

    if (response.ok && response.data.errorId === 0) {
      if (this.debug) {
        console.log(`Task [ ${response.data.taskId} ] - Created`);
      }
      return response.data.taskId;
    }

    throw new Error(response.data.errorDescription);
  }

  /**
   * Check a task to be resolved. Will try for given amount at the give time interval.
   *
   * @param {number} taskId - The task ID you want to check result.
   * @param {number} [retry=12] - The number of time the request must be tryed if worker is busy.
   * @param {number} [retryInterval=10000] - The amount of time before first and each try.
   *
   * @see createTask
   * @memberof AntiCaptcha
   */
  public async getTaskResult<T>(
    taskId: number,
    retry: number = 12,
    retryInterval = 10000
  ) {
    let retryCount = 0;
    return new Promise((resolve, reject) => {
      const routine = setInterval(async () => {
        if (this.debug) {
          console.log(`Task [ ${taskId} ] - Retry : ${retryCount}`);
        }
        if (retryCount > retry) {
          if (this.debug) {
            console.log(
              `Task [${taskId}] - Exceeded retry count [ ${retry} ].`
            );
          }
          clearInterval(routine);
          reject(new Error("L'appel est timeout."));
          return;
        }

        const response = (await this.api.post("getTaskResult", {
          taskId
        })) as ApiResponse<IGetTaskResultResponse<T>>;

        retryCount++; // We update the timeout count

        // API service failure
        if (response.ok && response.data.errorId > 0) {
          reject(
            new AntiCaptchaError(
              response.data.errorCode,
              response.data.errorDescription
            )
          );
        }

        // Generic failure
        if (!response.ok || !response.data || response.data.errorId !== 0) {
          clearInterval(routine);
          reject(
            new Error(
              response.data && response.data.hasOwnProperty("errorDescription")
                ? response.data.errorDescription
                : "http request to get task result failed"
            )
          );
          return;
        }

        // If request is OK, we resolve
        if (response.data.status === TaskStatus.READY) {
          if (this.debug) {
            console.log(`Task [ ${taskId} ] - Hash found !`);
          }
          clearInterval(routine);
          resolve(response.data);
          return;
        }
      }, retryInterval);
    }) as Promise<IGetTaskResultResponse<T>>;
  }
}
