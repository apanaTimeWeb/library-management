import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WhatsAppTemplate } from '@/core/entities/whatsapp-template.entity';
import { UpdateWhatsAppTemplateDto } from '../dto/update-whats-app-template.dto';
import { WhatsAppTemplateNotFoundException } from '../exceptions/whatsapp-templates.exceptions';

@Injectable()
export class UpdateWhatsAppTemplateService {
  constructor(
    @InjectRepository(WhatsAppTemplate)
    private readonly repository: Repository<WhatsAppTemplate>,
  ) {}

  async execute(id: string, dto: UpdateWhatsAppTemplateDto): Promise<WhatsAppTemplate> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new WhatsAppTemplateNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
