export enum TaskTypes {
  NOCAPTCHA_PROXYLESS = "NoCaptchaTaskProxyless",
  NOCAPTCHA = "NoCaptchaTask",
  RECAPTCHA_PROXYLESS = "RecaptchaV3TaskProxyless",
  IMAGE_TO_TEXT = "ImageToTextTask",
  FUN_CAPTCHA = "FunCaptchaTask",
}

export enum QueueTypes {
  IMAGE_TO_TEXT_ENGLISH = "1",
  IMAGE_TO_TEXT_RUSSIAN = "2",
  RECAPTCHA_NOCAPTCHA = "5",
  RECAPTCHA_PROXYLESS = "6",
  FUNCAPTCHA = "7",
  FUNCAPTCHA_PROXYLESS = "10",
}

export enum LanguagePoolTypes {
  ENGLISH = "en",
  RUSSIAN = "ru",
}

export enum TaskStatus {
  PROCESSING = "processing",
  READY = "ready",
}

export enum RecaptchaWorkerScore {
  LOW = 0.3,
  MEDIUM = 0.5,
  HIGH = 0.9,
}

export enum ImageNumericRequirements {
  NO_REQUIREMENTS = 0,
  ONLY_NUMBERS = 1,
  LETTERS_ONLY = 2,
}

export enum ErrorCodes {
  /**
   * Account authorization key not found in the system
   */
  ERROR_KEY_DOES_NOT_EXIST = "1",
  /**
   * No idle captcha workers are available at the moment,
   * please try a bit later or try increasing your maximum bid
   *
   * @url https://anti-captcha.com/panel/settings/recognition
   */
  ERROR_NO_SLOT_AVAILABLE = "2",
  /**
   * The size of the captcha you are uploading is less than 100 bytes.
   */
  ERROR_ZERO_CAPTCHA_FILESIZE = "3",
  /**
   * The size of the captcha you are uploading is more than 500,000 bytes.
   */
  ERROR_TOO_BIG_CAPTCHA_FILESIZE = "4",
  /**
   * Account has zeo or negative balance
   */
  ERROR_ZERO_BALANCE = "10",
  /**
   * Request with current account key is not allowed from your IP. Please refer to IP list section located
   *
   * @url https://anti-captcha.com/panel/settings/security
   */
  ERROR_IP_NOT_ALLOWED = "11",
  /**
   * Captcha could not be solved by 5 different workers
   */
  ERROR_CAPTCHA_UNSOLVABLE = "12",
  /**
   * 100% recognition feature did not work due to lack of amount of guess attempts
   *
   * @url https://anti-captcha.com/panel/settings/recognition
   */
  ERROR_BAD_DUPLICATES = "13",
  /**
   * Request to API made with method which does not exist
   */
  ERROR_NO_SUCH_METHOD = "14",
  /**
   * Could not determine captcha file type by its exif header or
   * image type is not supported. The only allowed formats are JPG,
   * GIF, PNG
   */
  ERROR_IMAGE_TYPE_NOT_SUPPORTED = "15",
  /**
   * Captcha you are requesting does not exist in your current
   * captchas list or has been expired. Captchas are removed from
   * API after 5 minutes after upload.
   */
  ERROR_NO_SUCH_CAPCHA_ID = "16",
  /**
   * comment" property is required for this request
   */
  ERROR_EMPTY_COMMENT = "20",
  /**
   * Your IP is blocked due to API inproper use.
   *
   * @url https://anti-captcha.com/panel/tools/ipsearch
   */
  ERROR_IP_BLOCKED = "21",
  /**
   * Task property is empty or not set in createTask method. Please refer to API v2 documentation.
   *
   * @url https://anticaptcha.atlassian.net/wiki/spaces/API/pages/5079073/createTask+%3A+captcha+task+creating
   */
  ERROR_TASK_ABSENT = "22",
  /**
   * Task type is not supported or inproperly printed. Please check \"type\" parameter in task object.
   */
  ERROR_TASK_NOT_SUPPORTED = "23",
  /**
   * Some of the required values for successive user emulation are missing.
   */
  ERROR_INCORRECT_SESSION_DATA = "24",
  /**
   * Could not connect to proxy related to the task, connection refused
   */
  ERROR_PROXY_CONNECT_REFUSED = "25",
  /**
   * Could not connect to proxy related to the task, connection timeout
   */
  ERROR_PROXY_CONNECT_TIMEOUT = "26",
  /**
   * Connection to proxy for task has timed out
   */
  ERROR_PROXY_READ_TIMEOUT = "27",
  /**
   * Proxy IP is banned by target service
   */
  ERROR_PROXY_BANNED = "28",
  /**
   * Task denied at proxy checking state. Proxy must be non-transparent to hide our server IP.
   */
  ERROR_PROXY_TRANSPARENT = "29",
  /**
   * Recaptcha task timeout, probably due to slow proxy server or Google server
   */
  ERROR_RECAPTCHA_TIMEOUT = "30",
  /**
   * Recaptcha server reported that site key is invalid
   */
  ERROR_RECAPTCHA_INVALID_SITEKEY = "31",
  /**
   * Recaptcha server reported that domain for this site key is invalid
   */
  ERROR_RECAPTCHA_INVALID_DOMAIN = "32",
  /**
   * Recaptcha server reported that browser user-agent is not compatible with their javascript
   */
  ERROR_RECAPTCHA_OLD_BROWSER = "33",
  /**
   * Captcha provider server reported that additional variable token has been expired. Please try again with new token.
   */
  ERROR_TOKEN_EXPIRED = "34",
  /**
   * Proxy does not support transfer of image data from Google servers
   */
  ERROR_PROXY_HAS_NO_IMAGE_SUPPORT = "35",
  /**
   * Proxy does not support long GET requests with length about 2000 bytes and does not support SSL connections
   */
  ERROR_PROXY_INCOMPATIBLE_HTTP_VERSION = "36",
  /**
   * Could not connect to Factory Server API within 5 seconds
   */
  ERROR_FACTORY_SERVER_API_CONNECTION_FAILED = "37",
  /**
   * Incorrect Factory Server JSON response, something is broken
   */
  ERROR_FACTORY_SERVER_BAD_JSON = "38",
  /**
   * Factory Server API did not send any errorId
   */
  ERROR_FACTORY_SERVER_ERRORID_MISSING = "39",
  /**
   * Factory Server API reported errorId != 0, check this error
   */
  ERROR_FACTORY_SERVER_ERRORID_NOT_ZERO = "40",
  /**
   * Some of the required property values are missing in Factory
   * form specifications. Customer must send all required values.
   */
  ERROR_FACTORY_MISSING_PROPERTY = "41",
  /**
   * Expected other type of property value in Factory form structure. Customer must send specified value type.
   */
  ERROR_FACTORY_PROPERTY_INCORRECT_FORMAT = "42",
  /**
   * Factory control belong to another account, check your account key.
   */
  ERROR_FACTORY_ACCESS_DENIED = "43",
  /**
   * Factory Server general error code
   */
  ERROR_FACTORY_SERVER_OPERATION_FAILED = "44",
  /**
   * Factory Platform general error code.
   */
  ERROR_FACTORY_PLATFORM_OPERATION_FAILED = "45",
  /**
   * Factory task lifetime protocol broken during task workflow.
   */
  ERROR_FACTORY_PROTOCOL_BROKEN = "46",
  /**
   * Task not found or not available for this operation
   */
  ERROR_FACTORY_TASK_NOT_FOUND = "47",
  /**
   * Factory is sandboxed, creating tasks is possible only by Factory owner. Switch it to
   * production mode to make it available for other customers.
   */
  ERROR_FACTORY_IS_SANDBOXED = "48",
  /**
   * Proxy login and password are incorrect
   */
  ERROR_PROXY_NOT_AUTHORISED = "49",
  /**
   * Customer did not enable Funcaptcha Proxyless tasks in Customers Area - API Settings.
   * All customers must read terms, pass mini test and sign/accept the form before being
   * able to use this feature.
   *
   * @url https://anti-captcha.com/clients/settings/apisetup
   */
  ERROR_FUNCAPTCHA_NOT_ALLOWED = "50",
  /**
   * Recaptcha was attempted to be solved as usual one, instead of invisible mode.
   * Basically you don't need to do anything when this error occurs, just continue
   * sending tasks with this domain. Our system will self-learn to solve recaptchas
   * from this sitekey in invisible mode.
   */
  ERROR_INVISIBLE_RECAPTCHA = "51",
  /**
   * Could not load captcha provider widget in worker browser. Please try sending new task.
   */
  ERROR_FAILED_LOADING_WIDGET = "52",
}
