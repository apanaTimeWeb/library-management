import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Holiday } from '@/core/entities/holiday.entity';
import { UpdateHolidayDto } from '@/modules/manager/settings/holidays/dto/update-holiday.dto';
import { HolidayNotFoundException } from '@/modules/manager/settings/holidays/exceptions/holidays.exceptions';

@Injectable()
export class HolidaysUpdateService {
  constructor(
    @InjectRepository(Holiday)
    private readonly repository: Repository<Holiday>,
  ) {}

  async execute(id: string, dto: UpdateHolidayDto): Promise<Holiday> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new HolidayNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
