import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDCard } from '@/core/entities/id-card.entity';
import { UpdateIDCardDto } from '@/modules/manager/students/id-cards/dto/update-idcard.dto';
import { IDCardNotFoundException } from '@/modules/manager/students/id-cards/exceptions/id-cards.exceptions';

@Injectable()
export class IdCardsUpdateIdcardService {
  constructor(
    @InjectRepository(IDCard)
    private readonly repository: Repository<IDCard>,
  ) {}

  async execute(id: string, dto: UpdateIDCardDto): Promise<IDCard> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new IDCardNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
