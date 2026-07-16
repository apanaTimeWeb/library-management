import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from '@/core/entities/asset.entity';
import { CreateAssetDto } from '../dto/create-asset.dto';

@Injectable()
export class CreateAssetService {
  constructor(
    @InjectRepository(Asset)
    private readonly repository: Repository<Asset>,
  ) {}

  async execute(dto: CreateAssetDto): Promise<Asset> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
