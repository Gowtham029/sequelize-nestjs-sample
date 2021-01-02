import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiBody, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsersRequestDto } from "../../dtos/users-request.dto";
import { UsersResponseDto } from "../../dtos/users-response.dto";
import { UsersService } from "./user.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Users list",
    type: UsersResponseDto,
  })
  async getUsers(): Promise<UsersResponseDto[]> {
    return this.usersService.findAll();
  }

  @Get("/:id")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get User",
    type: UsersResponseDto,
  })
  @ApiParam({ name: "id", description: "id", example: 1 })
  async getUser(@Param("id") id: string): Promise<UsersResponseDto> {
    const result = await this.usersService.findOne(Number(id));
    return result;
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Create User",
    type: UsersRequestDto,
  })
  @ApiBody({ description: "request body", type: UsersRequestDto })
  async createUser(@Body() data: UsersRequestDto): Promise<void> {
    return this.usersService.create(data);
  }

  @Put("/:id")
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: "Update User",
    type: UsersRequestDto,
  })
  @ApiBody({ description: "request body", type: UsersRequestDto })
  @ApiParam({ name: "id", description: "id", example: 1 })
  async upateUser(
    @Body() data: UsersRequestDto,
    @Param("id") id: string,
  ): Promise<void> {
    await this.usersService.update(Number(id), data);
  }
}
