import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDCard } from '@/core/entities/id-card.entity';
import { IDCardNotFoundException } from '@/modules/manager/students/id-cards/exceptions/id-cards.exceptions';

@Injectable()
export class IdCardsDeleteIdcardService {
  constructor(
    @InjectRepository(IDCard)
    private readonly repository: Repository<IDCard>,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new IDCardNotFoundException();
    await this.repository.remove(existing);
  }
}
