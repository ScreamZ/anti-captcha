import { ErrorCodes, ImageNumericRequirements, LanguagePoolTypes, RecaptchaWorkerScore, TaskStatus, TaskTypes} from "./enum";

export interface IApiError {
  errorId: number;
  errorCode: ErrorCodes;
  errorDescription: string;
}

export interface IGetQueueStatsResponse extends IApiError {
  /**
   * Amount of idle workers online, waiting for a task
   */
  waiting: number;
  /**
   * Queue load in percents
   */
  load: number;
  /**
   * Average task solution cost in USD
   */
  bid: string;
  /**
   * Average task solution speed in seconds
   */
  speed: number;
  /**
   * Total number of workers
   */
  total: number;
}

export interface IGetBalanceResponse extends IApiError {
  balance: number;
}

export interface ICreateTaskRequest<T> {
  /**
   * Sets workers pool language.
   */
  languagePool?: LanguagePoolTypes;
  /**
   * ID of your application from AppCenter,
   * this is required to earn 10% from clients spendings which use your application.
   * @url https://anti-captcha.com/panel/tools/appcenter#developer
   */
  softId?: string;
  /**
   * Task data
   */
  task: T;
  /**
   * Optional web address were will send result of captcha/factory task processing.
   * Contents are sent by AJAX POST request and are similar to the contents of
   * getTaskResult method.
   * @url https://anticaptcha.atlassian.net/wiki/spaces/API/pages/5079103/getTaskResult+%3A+request+task+result
   */
  callbackUrl?: string;
}

export interface ICreateTaskResponse extends IApiError {
  taskId: number;
}

export interface INoCaptchaTaskProxyless {
  /**
   * Must be set to NoCaptchaTaskProxyless
   */
  type: TaskTypes.NOCAPTCHA_PROXYLESS;
  /**
   * Address of target web page
   */
  websiteURL: string;
  /**
   * Recaptcha website key
   * @example <div class="g-recaptcha" data-sitekey="THAT_ONE"></div>
   */
  websiteKey: string;
  /**
   * Secret token for previous version of Recaptcha (now deprecated). In
   * most cases websites use newer version and this token is not required.
   */
  websiteSToken?: string;
  /**
   * Specify that Recaptcha is invisible. This will render an appropriate widget
   * for our workers.
   */
  isInvisible?: boolean;
}

export interface INoCaptchaTaskProxylessResult {
  /**
   * Hash string which is required for interacting with submit form on target website.
   */
  gRecaptchaResponse: string;
}

export interface IRecaptchaV3TaskProxyless {
  /**
   * Must be set to RecaptchaV3TaskProxyless
   */
  type: TaskTypes.RECAPTCHA_PROXYLESS;
  /**
   * Address of target web page
   */
  websiteURL: string;
  /**
   * Recaptcha website key
   * @example <div class="g-recaptcha" data-sitekey="THAT_ONE"></div>
   */
  websiteKey: string;
  /**
   * Filters a worker with corresponding score. Can be one of the following:
   * 0.3
   * 0.7
   * 0.9
   */
  minScore: RecaptchaWorkerScore;
  /**
   * Widget action value. Website owner defines what user is doing on the page through this parameter.
   * @example grecaptcha.execute('site_key', {action:'login_test'}).
   */
  pageAction: string;
}
export interface IRecaptchaV3TaskProxylessResult {
  /**
   * Hash string which is required for interacting with submit form on target website.
   */
  gRecaptchaResponse: string;
}

export interface IImageToTextTask {
  /**
   * Must be ImageToTextTask
   */
  type: TaskTypes.IMAGE_TO_TEXT;
  /**
   * File body encoded in base64. Make sure to send it without line breaks.
   */
  body: string;
  /**
   * false - no requirements
   * true - worker must enter an answer with at least one "space"
   */
  phrase?: boolean;
  /**
   * false - no requirements
   * true - worker will see a special mark telling that answer must be entered with case sensitivity.
   */
  case?: boolean;
  /**
   * 	0 - no requirements
   * 1 - only number are allowed
   * 2 - any letters are allowed except numbers
   */
  numeric?: ImageNumericRequirements;
  /**
   * false - no requirements
   * true - worker will see a special mark telling that answer must be calculated
   */
  math?: boolean;
  /**
   * minimum length of the answer
   */
  minLength?: number;
  /**
   * maximum length of the answer
   */
  maxLength?: number;
  /**
   * Additional comment for workers like "enter letters in red color".
   * Result is not guaranteed.
   */
  comment?: string;
}

export interface IImageToTextTaskResult {
  /**
   * Captcha answer
   */
  text: string;
  /**
   * Web address where captcha file can be downloaded. Available withing 48 hours after task creation.
   */
  url: string;
}

export interface IGetTaskResultRequest {
  /**
   * ID which was obtained in createTask method.
   */
  taskId: string;
}
export interface IGetTaskResultResponse<T> extends IApiError {
  /**
   * Task status.
   */
  status: TaskStatus;
  /**
   * Task result data. Different for each type of task.
   */
  solution: T;
  /**
   * Task cost in USD.
   */
  cost: number;
  /**
   * IP from which the task was created.
   */
  ip: string;
  /**
   * UNIX Timestamp of task creation.
   */
  createTime: number;
  /**
   * UNIX Timestamp of task completion.
   */
  endTime: number;

  /**
   * Number of workers who tried to complete your task
   *
   * @type {number}
   * @memberof IGetTaskResultResponse
   */
  solveCount: number;
}
