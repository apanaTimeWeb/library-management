import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blacklist } from '@/core/entities/blacklist.entity';
import { CreateBlacklistDto } from '../dto/create-blacklist.dto';

@Injectable()
export class CreateBlacklistService {
  constructor(
    @InjectRepository(Blacklist)
    private readonly repository: Repository<Blacklist>,
  ) {}

  async execute(dto: CreateBlacklistDto): Promise<Blacklist> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
