import { Test } from "@nestjs/testing";
import { getModelToken } from "@nestjs/sequelize";
import { Users } from "../../models/user.model";
import { UsersService } from "./user.service";
import { UsersController } from "./users.controller";

const testUser = { firstName: "Gowtham", lastName: "Karthick" };

describe("UsersService", () => {
    let service: UsersService;
    let controller: UsersController;

    beforeEach(async () => {
        const moduleReference = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                UsersService,
                {
                    provide: getModelToken(Users),
                    useValue: {
                        findAll: jest.fn(() => [testUser]),
                        create: jest.fn(() => testUser),
                        update: jest.fn(() => testUser),
                        findOne: jest.fn(() => testUser),
                        findByPk: jest.fn().mockResolvedValue({
                            save: jest.fn(),
                        }),
                        save: jest.fn(),
                    },
                },
            ],
        }).compile();
        service = moduleReference.get(UsersService);
        controller = moduleReference.get(UsersController);
    });

    it("** Service - Should get the users **", async () => {
        expect(await service.findAll()).toEqual([testUser]);
    });

    it("** Controller - Should get the users **", async () => {
        expect(await controller.getUsers()).toEqual([testUser]);
    });

    it("** Service - should add a User **", async () => {
        await service.create(testUser);
    });

    it("** Controller - should add a User **", async () => {
        await controller.createUser(testUser);
    });

    it("** Service - should get a User **", async () => {
        expect(await service.findOne(1)).toEqual(testUser);
    });

    it("** Controller - should get a User **", async () => {
        expect(await controller.getUser("1")).toEqual(testUser);
    });

    it("** Service - should Update a User **", async () => {
        await service.update(1, testUser);
    });

    it("** Controller - should get a User **", async () => {
        controller.upateUser(testUser, "1");
    });
});
