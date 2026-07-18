import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blacklist } from '@/core/entities/blacklist.entity';
import { UpdateBlacklistDto } from '../dto/update-blacklist.dto';
import { BlacklistNotFoundException } from '../exceptions/blacklist.exceptions';

@Injectable()
export class UpdateBlacklistService {
  constructor(
    @InjectRepository(Blacklist)
    private readonly repository: Repository<Blacklist>,
  ) {}

  async execute(id: string, dto: UpdateBlacklistDto): Promise<Blacklist> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new BlacklistNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
