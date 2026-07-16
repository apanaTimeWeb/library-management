import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDCard } from '@/core/entities/id-card.entity';
import { CreateIDCardDto } from '../dto/create-idcard.dto';

@Injectable()
export class CreateIDCardService {
  constructor(
    @InjectRepository(IDCard)
    private readonly repository: Repository<IDCard>,
  ) {}

  async execute(dto: CreateIDCardDto): Promise<IDCard> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
