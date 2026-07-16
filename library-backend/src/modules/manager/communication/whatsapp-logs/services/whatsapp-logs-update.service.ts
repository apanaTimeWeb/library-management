import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WhatsAppMessage } from '@/core/entities/whatsapp-message.entity';
import { UpdateWhatsAppMessageDto } from '@/modules/manager/communication/whatsapp-logs/dto/update-whatsapp-log.dto';
import { WhatsAppMessageNotFoundException } from '@/modules/manager/communication/whatsapp-logs/exceptions/whatsapp-logs.exceptions';

@Injectable()
export class WhatsappLogsUpdateService {
  constructor(
    @InjectRepository(WhatsAppMessage)
    private readonly repository: Repository<WhatsAppMessage>,
  ) {}

  async execute(id: string, dto: UpdateWhatsAppMessageDto): Promise<WhatsAppMessage> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new WhatsAppMessageNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
