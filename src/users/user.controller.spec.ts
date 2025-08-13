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

    it('deve encontrar usuário pelo ID', async () => {
        const user = {id: '550e8400-e29b-41d4-a716-446655440000', name: 'Jonatas', email: 'jonatas@gmail.com'}

        mockUserService.findOne.mockResolvedValue(user)

        const result = await controller.findOne('550e8400-e29b-41d4-a716-446655440000')
        
        expect(result).toEqual(user)
    })

    it('deve atualizar um usuário', async () => {
        const dto = {name: "Jonatas", email: "jonatas@gmail.com"}
        const updateUser = {... dto, id: '550e8400-e29b-41d4-a716-446655440000'}

        mockUserService.update.mockResolvedValue(updateUser)

        const result = await controller.update('550e8400-e29b-41d4-a716-446655440000', dto)

        expect(result).toEqual(updateUser)
    })

    it('deve deletar um usuário', async () => {
        const user = {id: '550e8400-e29b-41d4-a716-446655440000', name: 'Jonatas', email: 'jonats@gmail.com'}

        mockUserService.remove.mockResolvedValue(user)

        const result = await controller.remove('550e8400-e29b-41d4-a716-446655440000')
        
        expect(result).toEqual(user)
    })
})