import { Global, Module } from '@nestjs/common';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './common/interceptors/logger/logger.module';
import { AuthModule } from './common/middlewares/auth/auth.module';

@Global()
@Module({
    imports: [
        AuthModule,
        LoggerModule,
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB,
            models: [],
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
