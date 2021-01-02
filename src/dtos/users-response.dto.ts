import { ApiProperty } from "@nestjs/swagger";

export class UsersResponseDto {
    @ApiProperty({ example: "1", description: "ID of the User" })
    id: number;

    @ApiProperty({ example: "Karthick", description: "First Name of the User" })
    firstName: string;

    @ApiProperty({ example: "Mani", description: "Last Name of the User" })
    lastName: string;

    @ApiProperty({ example: true, description: "Active state of the User" })
    isActive: boolean;
}
