import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Locker } from '@/core/entities/locker.entity';
import { LockerNotFoundException } from '@/modules/manager/seats_shifts_lockers/lockers/exceptions/lockers.exceptions';

@Injectable()
export class LockersDeleteService {
  constructor(
    @InjectRepository(Locker)
    private readonly repository: Repository<Locker>,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new LockerNotFoundException();
    await this.repository.remove(existing);
  }
}
