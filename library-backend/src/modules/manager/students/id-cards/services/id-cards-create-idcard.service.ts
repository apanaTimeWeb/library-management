import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDCard } from '@/core/entities/id-card.entity';
import { CreateIDCardDto } from '@/modules/manager/students/id-cards/dto/create-idcard.dto';

@Injectable()
export class IdCardsCreateIdcardService {
  constructor(
    @InjectRepository(IDCard)
    private readonly repository: Repository<IDCard>,
  ) {}

  async execute(dto: CreateIDCardDto): Promise<IDCard> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
