import { IsEmail, IsString, MinLength } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class RegisterUserDto {
    @ApiProperty({
        description: "Nome do Usuário.",
        example: "Jonatas Marques"
    })
    @IsString()
    name: string

    @ApiProperty({
        description: "Email do Usuário.",
        example: "jontas@gmail.com"
    })
    @IsEmail()
    email: string

     @ApiProperty({
        description: "Senha do Usuário.",
        minLength: 6,
        example: "senha123"
    })
    @IsString()
    @MinLength(6)
    password: string 
}