import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SetupWizard } from '@/core/entities/setup-wizard.entity';
import { UpdateSetupWizardDto } from '../dto/update-setup-wizard.dto';
import { SetupWizardNotFoundException } from '../exceptions/setup-wizard.exceptions';

@Injectable()
export class UpdateSetupWizardService {
  constructor(
    @InjectRepository(SetupWizard)
    private readonly repository: Repository<SetupWizard>,
  ) {}

  async execute(id: string, dto: UpdateSetupWizardDto): Promise<SetupWizard> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new SetupWizardNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
