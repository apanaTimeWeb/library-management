import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WhatsAppTemplate } from '@/core/entities/whatsapp-template.entity';
import { CreateWhatsAppTemplateDto } from '../dto/create-whats-app-template.dto';

@Injectable()
export class CreateWhatsAppTemplateService {
  constructor(
    @InjectRepository(WhatsAppTemplate)
    private readonly repository: Repository<WhatsAppTemplate>,
  ) {}

  async execute(dto: CreateWhatsAppTemplateDto): Promise<WhatsAppTemplate> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
