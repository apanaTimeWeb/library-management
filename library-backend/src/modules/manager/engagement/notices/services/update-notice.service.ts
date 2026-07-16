import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notice } from '@/core/entities/notice.entity';
import { UpdateNoticeDto } from '../dto/update-notice.dto';
import { NoticeNotFoundException } from '../exceptions/notices.exceptions';

@Injectable()
export class UpdateNoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly repository: Repository<Notice>,
  ) {}

  async execute(id: string, dto: UpdateNoticeDto): Promise<Notice> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new NoticeNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
