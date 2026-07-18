import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShiftMigration } from '@/core/entities/shift-migration.entity';
import { CreateShiftMigrationDto } from '@/modules/manager/seats_shifts_lockers/shift-migrations/dto/create-shift-migration.dto';

@Injectable()
export class ShiftMigrationsCreateService {
  constructor(
    @InjectRepository(ShiftMigration)
    private readonly repository: Repository<ShiftMigration>,
  ) {}

  async execute(dto: CreateShiftMigrationDto): Promise<ShiftMigration> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
