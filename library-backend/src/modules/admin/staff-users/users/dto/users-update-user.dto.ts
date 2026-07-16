import { PartialType } from '@nestjs/swagger';
import { UsersCreateUserDto } from './create-user.dto';

export class UsersUpdateUserDto extends PartialType(CreateUserDto) {}
