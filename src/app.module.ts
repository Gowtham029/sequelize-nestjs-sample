import {
  Global,
  MiddlewareConsumer,
  Module,
  RequestMethod,
  ValidationPipe,
} from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { SequelizeModule } from "@nestjs/sequelize";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GlobalExceptionFilter } from "./common/filters/exception.filters";
import { LoggerModule } from "./common/interceptors/logger/logger.module";
import { AuthMiddleware } from "./common/middlewares/auth/auth.middleware";
import { AuthModule } from "./common/middlewares/auth/auth.module";
import { Users } from "./models/user.model";
import { UsersModule } from "./modules/users/users.module";

@Global()
@Module({
  imports: [
    AuthModule,
    LoggerModule,
    SequelizeModule.forRoot({
      dialect: "mysql",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB,
      models: [Users],
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    GlobalExceptionFilter,
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
