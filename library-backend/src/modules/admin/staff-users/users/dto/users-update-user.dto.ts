import { PartialType } from '@nestjs/swagger';
import { UsersCreateUserDto } from './users-create-user.dto';

export class UsersUpdateUserDto extends PartialType(UsersCreateUserDto) {}
