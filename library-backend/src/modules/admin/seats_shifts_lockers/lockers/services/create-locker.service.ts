import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Locker } from '@/core/entities/locker.entity';
import { CreateLockerDto } from '../dto/create-locker.dto';

@Injectable()
export class CreateLockerService {
  constructor(
    @InjectRepository(Locker)
    private readonly repository: Repository<Locker>,
  ) {}

  async execute(dto: CreateLockerDto): Promise<Locker> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
