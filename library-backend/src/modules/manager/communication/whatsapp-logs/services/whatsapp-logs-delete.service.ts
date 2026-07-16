import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WhatsAppMessage } from '@/core/entities/whatsapp-message.entity';
import { WhatsAppMessageNotFoundException } from '@/modules/manager/communication/whatsapp-logs/exceptions/whatsapp-logs.exceptions';

@Injectable()
export class WhatsappLogsDeleteService {
  constructor(
    @InjectRepository(WhatsAppMessage)
    private readonly repository: Repository<WhatsAppMessage>,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new WhatsAppMessageNotFoundException();
    await this.repository.remove(existing);
  }
}
