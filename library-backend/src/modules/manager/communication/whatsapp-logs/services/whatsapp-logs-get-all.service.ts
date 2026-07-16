import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { WhatsAppMessage } from '@/core/entities/whatsapp-message.entity';
import { GetWhatsAppMessagesQueryDto } from '@/modules/manager/communication/whatsapp-logs/dto/get-whatsapp-logs-query.dto';

@Injectable()
export class WhatsappLogsGetAllService {
  constructor(
    @InjectRepository(WhatsAppMessage)
    private readonly repository: Repository<WhatsAppMessage>,
  ) {}

  async execute(queryDto: GetWhatsAppMessagesQueryDto): Promise<{ items: WhatsAppMessage[]; total: number }> {
    const { page = 1, limit = 20, search } = queryDto;
    const where: FindOptionsWhere<WhatsAppMessage> = {};
    
    const [items, total] = await this.repository.findAndCount({
      where,
      order: { createdAt: 'DESC' } as any,
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, total };
  }
}
