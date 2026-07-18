import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SetupWizard } from '@/core/entities/setup-wizard.entity';
import { SetupWizardNotFoundException } from '../exceptions/setup-wizard.exceptions';

@Injectable()
export class DeleteSetupWizardService {
  constructor(
    @InjectRepository(SetupWizard)
    private readonly repository: Repository<SetupWizard>,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new SetupWizardNotFoundException();
    await this.repository.remove(existing);
  }
}
