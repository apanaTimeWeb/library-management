import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Locker } from '@/core/entities/locker.entity';
import { UpdateLockerDto } from '../dto/update-locker.dto';
import { LockerNotFoundException } from '../exceptions/lockers.exceptions';

@Injectable()
export class UpdateLockerService {
  constructor(
    @InjectRepository(Locker)
    private readonly repository: Repository<Locker>,
  ) {}

  async execute(id: string, dto: UpdateLockerDto): Promise<Locker> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new LockerNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
