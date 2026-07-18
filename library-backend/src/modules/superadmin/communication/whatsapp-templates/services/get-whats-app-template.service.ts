import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WhatsAppTemplate } from '@/core/entities/whatsapp-template.entity';
import { WhatsAppTemplateNotFoundException } from '../exceptions/whatsapp-templates.exceptions';

@Injectable()
export class GetWhatsAppTemplateService {
  constructor(
    @InjectRepository(WhatsAppTemplate)
    private readonly repository: Repository<WhatsAppTemplate>,
  ) {}

  async execute(id: string): Promise<WhatsAppTemplate> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new WhatsAppTemplateNotFoundException();
    return existing;
  }
}
