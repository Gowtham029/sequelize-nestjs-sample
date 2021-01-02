import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Users } from "../../models/user.model";
import { UsersService } from "./user.service";
import { UsersController } from "./users.controller";

@Module({
    imports: [SequelizeModule.forFeature([Users])],
    providers: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {}
