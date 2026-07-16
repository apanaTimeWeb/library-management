import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { SetupWizard } from '@/core/entities/setup-wizard.entity';
import { GetSetupWizardsQueryDto } from '../dto/get-setup-wizard-query.dto';

@Injectable()
export class GetAllSetupWizardsService {
  constructor(
    @InjectRepository(SetupWizard)
    private readonly repository: Repository<SetupWizard>,
  ) {}

  async execute(queryDto: GetSetupWizardsQueryDto): Promise<{ items: SetupWizard[]; total: number }> {
    const { page = 1, limit = 20, search } = queryDto;
    const where: FindOptionsWhere<SetupWizard> = {};
    
    const [items, total] = await this.repository.findAndCount({
      where,
      order: { createdAt: 'DESC' } as any,
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, total };
  }
}
