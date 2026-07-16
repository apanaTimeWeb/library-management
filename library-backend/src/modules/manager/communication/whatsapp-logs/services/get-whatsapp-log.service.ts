import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WhatsAppMessage } from '@/core/entities/whatsapp-message.entity';
import { WhatsAppMessageNotFoundException } from '../exceptions/whatsapp-logs.exceptions';

@Injectable()
export class GetWhatsAppMessageService {
  constructor(
    @InjectRepository(WhatsAppMessage)
    private readonly repository: Repository<WhatsAppMessage>,
  ) {}

  async execute(id: string): Promise<WhatsAppMessage> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new WhatsAppMessageNotFoundException();
    return existing;
  }
}
