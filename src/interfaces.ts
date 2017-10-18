export interface IApiError {
  errorId: number;
  errorCode: string;
  errorDescription: string;
}

export interface IGetBalanceResponse extends IApiError {
  balance: number;
}

export interface ICreateTaskResponse extends IApiError {
  taskId: number;
}

export interface IGetTaskResultResponse extends IApiError {
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
   * @memberof IGetTaskResultResponse
   */
  solveCount: number;
}
