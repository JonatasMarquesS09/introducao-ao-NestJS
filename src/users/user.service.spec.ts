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

   
})