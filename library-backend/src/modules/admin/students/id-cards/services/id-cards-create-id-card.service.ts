import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDCard } from '@/core/entities/id-card.entity';
import { IdCardsCreateIDCardDto } from '../dto/create-id-card.dto';

@Injectable()
export class IdCardsCreateIDCardService {
  constructor(
    @InjectRepository(IDCard)
    private readonly repository: Repository<IDCard>,
  ) {}

  async execute(dto: IdCardsCreateIDCardDto): Promise<IDCard> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
