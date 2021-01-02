import {
    Catch,
    ArgumentsHost,
    HttpStatus,
    HttpException,
} from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";

@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter {
    constructor() {
        super();
    }
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;
        Object.keys(HttpStatus).forEach(status => {
            if (
                exception instanceof HttpException &&
                exception.getStatus() === HttpStatus[status]
            ) {
                statusCode = HttpStatus[status];
            }
        });
        let message =
            exception instanceof Error
                ? exception.message
                : exception.message.error;
        message =
            typeof message === "object" ? JSON.stringify(message) : message;
        response.status(statusCode).json({
            statusCode: statusCode,
            timestamp: new Date().toISOString(),
            message: message,
        });
    }
}
