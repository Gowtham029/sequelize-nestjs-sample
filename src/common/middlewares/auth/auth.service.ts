import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { find } from "lodash";

import url = require("url");
import { JwtService } from "@nestjs/jwt";

/**
 * Auth service to check the endpoints
 *
 * @export
 * @class AuthService
 */
@Injectable()
export class AuthService {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor(private readonly jwtService: JwtService) {}

    /**
     * To validate the auth token
     *
     * @param {string} token
     * @returns
     * @memberof AuthService
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async validateAuthToken(token: string): Promise<any> {
        try {
            token = token.replace("Bearer ", "");
            const result = await this.jwtService.verify(token);
            return result;
        } catch (error) {
            throw new HttpException("Invalid Token", HttpStatus.UNAUTHORIZED);
        }
    }

    async createAuthToken(payload: any): Promise<String> {
        const token = this.jwtService.sign({
            _id: payload._id,
            role: payload.role,
        });
        return token;
    }

    /**
     * To Check the exclude URL
     *
     * @public
     * @param {*} originalUrl
     * @returns
     * @memberof AuthService
     */
    public isExcluded(originalUrl): boolean {
        const exclude = ["/api-docs", "/common"];
        const pathname = url.parse(originalUrl).path;
        if (pathname === "/") {
            return true;
        }
        return find(exclude, (suffix: string) => pathname.startsWith(suffix));
    }
}
