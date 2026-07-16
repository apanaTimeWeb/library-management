import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { WhatsAppTemplate } from '@/core/entities/whatsapp-template.entity';
import { GetWhatsAppTemplatesQueryDto } from '../dto/get-whatsapp-templates-query.dto';

@Injectable()
export class GetAllWhatsAppTemplatesService {
  constructor(
    @InjectRepository(WhatsAppTemplate)
    private readonly repository: Repository<WhatsAppTemplate>,
  ) {}

  async execute(queryDto: GetWhatsAppTemplatesQueryDto): Promise<{ items: WhatsAppTemplate[]; total: number }> {
    const { page = 1, limit = 20, search } = queryDto;
    const where: FindOptionsWhere<WhatsAppTemplate> = {};
    
    const [items, total] = await this.repository.findAndCount({
      where,
      order: { createdAt: 'DESC' } as any,
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, total };
  }
}
