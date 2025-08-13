import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { PrismaService } from "../prisma/prisma.service";
import { NotFoundException } from "@nestjs/common";

const mockPrisma = {
    user: {
        create: jest.fn(), 
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }
}

describe("UsersService", () => {
    let service: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {provide: PrismaService, useValue: mockPrisma},
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
    })


    it("deve criar um usuário", async () =>{
        const dto = {name: "Jonatas", email: "jonatas@gmail.com", password: "123"};
        mockPrisma.user.create.mockResolvedValue(dto);

        const result = await service.create(dto as any);
        expect(result).toEqual(dto);
        expect(mockPrisma.user.create).toHaveBeenCalledWith({ data: dto });
    })

    it("deve listar todos os usuários", async () => {
        mockPrisma.user.findMany.mockResolvedValue([]);

        const result = await service.findAll();
        expect(result).toEqual([]);
        expect(mockPrisma.user.findMany).toHaveBeenCalled();
    })

   it("deve encontrar um usuário pelo id", async () => {
        const user = { id: '550e8400-e29b-41d4-a716-446655440000', name: "Jonatas", email: "Jonats@gmail.com", password: '123'};
        mockPrisma.user.findUnique.mockResolvedValue(user);

        const result = await service.findOne('550e8400-e29b-41d4-a716-446655440000');
        expect(result).toEqual(user);
        expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
            where: { id: '550e8400-e29b-41d4-a716-446655440000' },
        });
    })

     it("deve atualizar um usuário", async () => {
        const dto = { name: "Jonatas", email: "jonatas@gmail.com", password: '123', };
        const updatedUser = { ...dto, id: '550e8400-e29b-41d4-a716-446655440000' };
        mockPrisma.user.update.mockResolvedValue(updatedUser);

        const result = await service.update('550e8400-e29b-41d4-a716-446655440000', dto);
        expect(result).toEqual(updatedUser);
        expect(mockPrisma.user.update).toHaveBeenCalledWith({
            where: { id: '550e8400-e29b-41d4-a716-446655440000' },
            data: dto,
        }); 
    })

    it("deve remover um usuário", async () => {
    const user = { id: '550e8400-e29b-41d4-a716-446655440000', name: "Jonatas", email: "jonatas@gmail.com", password: '123' };
    mockPrisma.user.delete.mockResolvedValue(user); 

    const result = await service.remove('550e8400-e29b-41d4-a716-446655440000');
    expect(result).toEqual(user);
    expect(mockPrisma.user.delete).toHaveBeenCalledWith({
        where: { id: '550e8400-e29b-41d4-a716-446655440000' },
    });
});
})