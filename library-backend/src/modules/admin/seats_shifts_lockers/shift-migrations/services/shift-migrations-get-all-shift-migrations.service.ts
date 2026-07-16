import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { ShiftMigration } from '@/core/entities/shift-migration.entity';
import { ShiftMigrationsGetShiftMigrationsQueryDto } from '../dto/get-shift-migrations-query.dto';

@Injectable()
export class ShiftMigrationsGetAllService {
  constructor(
    @InjectRepository(ShiftMigration)
    private readonly repository: Repository<ShiftMigration>,
  ) {}

  async execute(queryDto: ShiftMigrationsGetShiftMigrationsQueryDto): Promise<{ items: ShiftMigration[]; total: number }> {
    const { page = 1, limit = 20, search } = queryDto;
    const where: FindOptionsWhere<ShiftMigration> = {};
    
    const [items, total] = await this.repository.findAndCount({
      where,
      order: { createdAt: 'DESC' } as any,
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, total };
  }
}
