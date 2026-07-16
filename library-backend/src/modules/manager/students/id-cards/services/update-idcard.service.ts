import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDCard } from '@/core/entities/id-card.entity';
import { UpdateIDCardDto } from '../dto/update-idcard.dto';
import { IDCardNotFoundException } from '../exceptions/id-cards.exceptions';

@Injectable()
export class UpdateIDCardService {
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
