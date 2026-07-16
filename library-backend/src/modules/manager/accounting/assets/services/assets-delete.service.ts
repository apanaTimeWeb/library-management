import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from '@/core/entities/asset.entity';
import { AssetNotFoundException } from '@/modules/manager/accounting/assets/exceptions/assets.exceptions';

@Injectable()
export class AssetsDeleteService {
  constructor(
    @InjectRepository(Asset)
    private readonly repository: Repository<Asset>,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new AssetNotFoundException();
    await this.repository.remove(existing);
  }
}
