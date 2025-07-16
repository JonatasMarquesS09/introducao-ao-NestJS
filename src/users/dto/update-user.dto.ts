import { PartialType } from '@nestjs/swagger';
import { CreteUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreteUserDto) { }