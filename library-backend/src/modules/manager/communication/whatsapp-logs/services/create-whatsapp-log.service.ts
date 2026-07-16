import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WhatsAppMessage } from '@/core/entities/whatsapp-message.entity';
import { CreateWhatsAppMessageDto } from '../dto/create-whatsapp-log.dto';

@Injectable()
export class CreateWhatsAppMessageService {
  constructor(
    @InjectRepository(WhatsAppMessage)
    private readonly repository: Repository<WhatsAppMessage>,
  ) {}

  async execute(dto: CreateWhatsAppMessageDto): Promise<WhatsAppMessage> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
