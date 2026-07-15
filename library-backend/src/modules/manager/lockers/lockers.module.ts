import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locker } from '../../../core/entities/locker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Locker])],
  providers: []
})
export class ManagerLockersModule {}
