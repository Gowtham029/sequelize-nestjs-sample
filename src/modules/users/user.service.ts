import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UsersRequestDto } from "src/dtos/users-request.dto";
import { Users } from "../../models/user.model";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private userModel: typeof Users,
  ) {}

  public async findAll(): Promise<Users[]> {
    return this.userModel.findAll();
  }

  public async findOne(id: number): Promise<Users> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  public async create(data: UsersRequestDto): Promise<void> {
    await this.userModel.create(data);
  }

  public async update(id: number, data: UsersRequestDto): Promise<void> {
    const result = await this.userModel.findByPk<Users>(id);
    Object.assign(result, data);
    await result.save();
  }

}
