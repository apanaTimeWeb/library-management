import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDCard } from '@/core/entities/id-card.entity';
import { IDCardNotFoundException } from '../exceptions/id-cards.exceptions';

@Injectable()
export class IdCardsGetIDCardService {
  constructor(
    @InjectRepository(IDCard)
    private readonly repository: Repository<IDCard>,
  ) {}

  async execute(id: string): Promise<IDCard> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new IDCardNotFoundException();
    return existing;
  }
}
