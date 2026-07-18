import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShiftMigration } from '@/core/entities/shift-migration.entity';
import { UpdateShiftMigrationDto } from '../dto/update-shift-migration.dto';
import { ShiftMigrationNotFoundException } from '../exceptions/shift-migrations.exceptions';

@Injectable()
export class UpdateShiftMigrationService {
  constructor(
    @InjectRepository(ShiftMigration)
    private readonly repository: Repository<ShiftMigration>,
  ) {}

  async execute(id: string, dto: UpdateShiftMigrationDto): Promise<ShiftMigration> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new ShiftMigrationNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
