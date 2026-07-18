import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Locker } from '@/core/entities/locker.entity';
import { LockersCreateLockerDto } from '../dto/lockers-create-locker.dto';

@Injectable()
export class LockersCreateLockerService {
  constructor(
    @InjectRepository(Locker)
    private readonly repository: Repository<Locker>,
  ) {}

  async execute(dto: LockersCreateLockerDto): Promise<Locker> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
