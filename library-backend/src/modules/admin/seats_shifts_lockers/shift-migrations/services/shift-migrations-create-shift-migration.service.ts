import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShiftMigration } from '@/core/entities/shift-migration.entity';
import { ShiftMigrationsCreateShiftMigrationDto } from '../dto/shift-migrations-create-shift-migration.dto';

@Injectable()
export class ShiftMigrationsCreateShiftMigrationService {
  constructor(
    @InjectRepository(ShiftMigration)
    private readonly repository: Repository<ShiftMigration>,
  ) {}

  async execute(dto: ShiftMigrationsCreateShiftMigrationDto): Promise<ShiftMigration> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
