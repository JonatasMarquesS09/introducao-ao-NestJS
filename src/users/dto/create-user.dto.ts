import { ApiProperty } from "@nestjs/swagger"

export class CreteUserDto {
    @ApiProperty({
        example:'Jonas Fortes', 
        description:'Nome completo do usuário'
    })
    name: string
    
    @ApiProperty({
        example:'jonas@gmail.com',
        description:'Email do usuário'
    })

    
    email: string
}
