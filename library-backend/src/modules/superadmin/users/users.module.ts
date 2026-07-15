import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminUsersService } from './users.service';
import { User } from '../../../core/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [SuperadminUsersService],
  exports: [SuperadminUsersService],
})
export class SuperadminUsersModule {}
