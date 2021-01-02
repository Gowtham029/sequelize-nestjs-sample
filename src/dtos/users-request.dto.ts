import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UsersRequestDto {
    @ApiProperty({ example: "Karthick", description: "First Name of the User" })
    @IsString()
    firstName: string;

    @ApiProperty({ example: "Mani", description: "Last Name of the User" })
    @IsString()
    lastName: string;
}
