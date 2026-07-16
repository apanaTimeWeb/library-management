import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShiftMigration } from '@/core/entities/shift-migration.entity';
import { ShiftMigrationNotFoundException } from '@/modules/manager/seats_shifts_lockers/shift-migrations/exceptions/shift-migrations.exceptions';

@Injectable()
export class ShiftMigrationsDeleteService {
  constructor(
    @InjectRepository(ShiftMigration)
    private readonly repository: Repository<ShiftMigration>,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new ShiftMigrationNotFoundException();
    await this.repository.remove(existing);
  }
}
