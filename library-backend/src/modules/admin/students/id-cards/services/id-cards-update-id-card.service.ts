import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDCard } from '@/core/entities/id-card.entity';
import { IdCardsUpdateIDCardDto } from '../dto/id-cards-update-id-card.dto';
import { IDCardNotFoundException } from '../exceptions/id-cards.exceptions';

@Injectable()
export class IdCardsUpdateIDCardService {
  constructor(
    @InjectRepository(IDCard)
    private readonly repository: Repository<IDCard>,
  ) {}

  async execute(id: string, dto: IdCardsUpdateIDCardDto): Promise<IDCard> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new IDCardNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
