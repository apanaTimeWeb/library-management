import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notice } from '@/core/entities/notice.entity';
import { NoticeNotFoundException } from '../exceptions/notices.exceptions';

@Injectable()
export class DeleteNoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly repository: Repository<Notice>,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new NoticeNotFoundException();
    await this.repository.remove(existing);
  }
}
