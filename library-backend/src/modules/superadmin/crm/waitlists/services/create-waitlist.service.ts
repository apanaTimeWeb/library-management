import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Waitlist } from '@/core/entities/waitlist.entity';
import { CreateWaitlistDto } from '../dto/create-waitlist.dto';

@Injectable()
export class CreateWaitlistService {
  constructor(
    @InjectRepository(Waitlist)
    private readonly repository: Repository<Waitlist>,
  ) {}

  async execute(dto: CreateWaitlistDto): Promise<Waitlist> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
