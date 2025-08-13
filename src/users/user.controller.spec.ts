import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

const mockUserService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
}

describe("User Controller Tests", () => {
    let controller: UsersController;

    beforeEach( async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {provide: UsersService, useValue: mockUserService},
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController)
    })

    it('deve listar todos os usuários', async () => {
        const users = [
            {name: "Jonatas", email: "jonats@gmail.com"},
            {name: "James", email: "james@gmail.com"}
        ]

        mockUserService.findAll.mockResolvedValue(users)

        expect(await controller.findAll()).toEqual(users)
    })
})