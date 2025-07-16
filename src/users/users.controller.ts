import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreteUserDto } from './dto/create-user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/users')
export class UsersController {
constructor(private readonly usersService: UsersService) {}

  /* @Post()
   @ApiOperation({summary: 'Criar um novo usuário'})
   @ApiBody({type: 'CreateUserDto'})
   @ApiResponse({status: 201, description: 'Usuário criado com sucesso!'})
   create(@Body() data: CreteUserDto) {
      return this.usersService.create(data);
   }
*/
   
   @Get()
   
   @ApiOperation({summary: 'Mostra todos os usuários'})
   @ApiResponse({status: 200, description: 'Todos os usuários encontrados com sucesso'})
   findAll() {
      return this.usersService.findAll()
   }

   @Get(':id')
   @ApiOperation({summary: 'Mostra usuário pelo ID'})
   @ApiResponse({status: 200, description: 'Usuário encontrado com sucesso'})
   @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
   @ApiParam({ name: 'id', type: Number, description: 'ID do usuário' })
   findOne (@Param('id') id: string) {
      return this.usersService.findOne(id)
   }

   @Put(':id')
   @ApiOperation({ summary: 'Atualizar um usuário' })
   @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.' })
   @ApiParam({ name: 'id', type: Number, description: 'ID do usuário' })
   @ApiBody({type: UpdateUserDto })
   update(@Param('id') id: string, @Body() data: UpdateUserDto) {
      return this.usersService.update(id, data)
   }

   @Delete(':id')
   @ApiOperation({ summary: 'Remover um usuário' })
   @ApiResponse({ status: 200, description: 'Usuário removido com sucesso.' })
   @ApiParam({ name: 'id', type: Number, description: 'ID do usuário' })
   remove(@Param('id') id: string) {
      return this.usersService.remove(id)
   }

}