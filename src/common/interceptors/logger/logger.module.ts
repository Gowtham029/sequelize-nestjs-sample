import { Module } from "@nestjs/common";
import { LoggerService } from "./logger.service";
import { LogInterceptor } from "./logger.interceptor";

@Module({
    providers: [LoggerService, LogInterceptor],
    exports: [LoggerService, LogInterceptor],
})
export class LoggerModule {}
