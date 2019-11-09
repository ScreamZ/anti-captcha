import { ErrorCodes } from "./enum";

export class AntiCaptchaError extends Error {
    public readonly code: ErrorCodes;

    constructor(code: ErrorCodes, message: string) {
        super(message);
        this.code = code;
    }
}
