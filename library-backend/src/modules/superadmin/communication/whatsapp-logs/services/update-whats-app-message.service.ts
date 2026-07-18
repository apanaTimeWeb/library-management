import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WhatsAppMessage } from '@/core/entities/whatsapp-message.entity';
import { UpdateWhatsAppMessageDto } from '../dto/update-whats-app-message.dto';
import { WhatsAppMessageNotFoundException } from '../exceptions/whatsapp-logs.exceptions';

@Injectable()
export class UpdateWhatsAppMessageService {
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
