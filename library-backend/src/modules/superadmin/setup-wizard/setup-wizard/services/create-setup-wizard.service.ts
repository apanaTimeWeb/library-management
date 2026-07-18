import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SetupWizard } from '@/core/entities/setup-wizard.entity';
import { CreateSetupWizardDto } from '../dto/create-setup-wizard.dto';

@Injectable()
export class CreateSetupWizardService {
  constructor(
    @InjectRepository(SetupWizard)
    private readonly repository: Repository<SetupWizard>,
  ) {}

  async execute(dto: CreateSetupWizardDto): Promise<SetupWizard> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
