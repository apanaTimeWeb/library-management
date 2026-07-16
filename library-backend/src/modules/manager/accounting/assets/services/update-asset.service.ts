import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from '@/core/entities/asset.entity';
import { UpdateAssetDto } from '../dto/update-asset.dto';
import { AssetNotFoundException } from '../exceptions/assets.exceptions';

@Injectable()
export class UpdateAssetService {
  constructor(
    @InjectRepository(Asset)
    private readonly repository: Repository<Asset>,
  ) {}

  async execute(id: string, dto: UpdateAssetDto): Promise<Asset> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new AssetNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
