import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShiftMigration } from '@/core/entities/shift-migration.entity';
import { ShiftMigrationNotFoundException } from '../exceptions/shift-migrations.exceptions';

@Injectable()
export class GetShiftMigrationService {
  constructor(
    @InjectRepository(ShiftMigration)
    private readonly repository: Repository<ShiftMigration>,
  ) {}

  async execute(id: string): Promise<ShiftMigration> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new ShiftMigrationNotFoundException();
    return existing;
  }
}
