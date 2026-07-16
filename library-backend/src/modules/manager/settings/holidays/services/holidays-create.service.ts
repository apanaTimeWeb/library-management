import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Holiday } from '@/core/entities/holiday.entity';
import { CreateHolidayDto } from '@/modules/manager/settings/holidays/dto/create-holiday.dto';

@Injectable()
export class HolidaysCreateService {
  constructor(
    @InjectRepository(Holiday)
    private readonly repository: Repository<Holiday>,
  ) {}

  async execute(dto: CreateHolidayDto): Promise<Holiday> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
