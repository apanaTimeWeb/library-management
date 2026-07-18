import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blacklist } from '@/core/entities/blacklist.entity';
import { BlacklistNotFoundException } from '../exceptions/blacklist.exceptions';

@Injectable()
export class GetBlacklistService {
  constructor(
    @InjectRepository(Blacklist)
    private readonly repository: Repository<Blacklist>,
  ) {}

  async execute(id: string): Promise<Blacklist> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new BlacklistNotFoundException();
    return existing;
  }
}
