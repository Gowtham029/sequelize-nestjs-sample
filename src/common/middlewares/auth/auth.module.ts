import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        JwtModule.register({
            secret: "H#ll0W0r!D",
            signOptions: { expiresIn: "3600s" },
        }),
    ],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
