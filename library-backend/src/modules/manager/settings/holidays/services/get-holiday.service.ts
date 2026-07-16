import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Holiday } from '@/core/entities/holiday.entity';
import { HolidayNotFoundException } from '../exceptions/holidays.exceptions';

@Injectable()
export class GetHolidayService {
  constructor(
    @InjectRepository(Holiday)
    private readonly repository: Repository<Holiday>,
  ) {}

  async execute(id: string): Promise<Holiday> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new HolidayNotFoundException();
    return existing;
  }
}
