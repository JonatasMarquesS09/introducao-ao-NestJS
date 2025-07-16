import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
constructor(private prisma: PrismaService) {}

   async create(data: Prisma.UserCreateInput): Promise<User> {
      return this.prisma.user.create({ data });
   }

   async findAll(): Promise<User[]> {
      return this.prisma.user.findMany()
   }

   async findOne(id: string): Promise<User | null> {
      const foundUser = await this.prisma.user.findUnique(
         {where:{id}}
      )

      if(!foundUser) {
         throw new NotFoundException(`Usuário com ID ${id} não encontradp!`)
      }

      return foundUser
   }

   async update(id: string, data:Prisma.UserUpdateInput): Promise<User | null> {
      const foundId = await this.prisma.user.findUnique({where: {id}})

      if(!foundId){
         throw new NotFoundException(`Usuário com ID ${id} não encontradp!`)
      }

      return await this.prisma.user.update({where: {id}, data})
   }

   async remove (id: string): Promise<User | null> {
      try{
          return await this.prisma.user.delete({where: {id}})
      }catch {
         throw new NotFoundException(`Usuário com ID ${id} não encontradp!`)
      }
   }
}