import { NestMiddleware, Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";

/**
 * The Auth Middleware to validate the endpoints authorization
 *
 * @export
 * @class AuthMiddleware
 * @implements {NestMiddleware}
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
    /**
     *Creates an instance of AuthMiddleware.
     * @param {AuthService} config
     * @memberof AuthMiddleware
     */
    constructor(private readonly authService: AuthService) {}

    /**
     * To validate the authorization token for the routes
     *
     * @param {Request} request
     * @param {Response} response
     * @param {NextFunction} next
     * @returns {Promise<void>}
     * @memberof AuthMiddleware
     */
    async use(request: Request, response: Response, next: NextFunction): Promise<void> {
        const isExcluded = await this.authService.isExcluded(request.originalUrl);
        if (isExcluded) {
            next();
            return;
        }
        if (request.headers.authorization) {
            const token = request.headers.authorization;
            request["user"] = await this.authService.validateAuthToken(token);
            next();
            return;
        }
        throw new HttpException("Invalid Token", HttpStatus.UNAUTHORIZED);
    }
}
