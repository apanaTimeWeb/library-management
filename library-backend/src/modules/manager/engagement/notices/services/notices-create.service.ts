import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notice } from '@/core/entities/notice.entity';
import { CreateNoticeDto } from '@/modules/manager/engagement/notices/dto/create-notice.dto';

@Injectable()
export class NoticesCreateService {
  constructor(
    @InjectRepository(Notice)
    private readonly repository: Repository<Notice>,
  ) {}

  async execute(dto: CreateNoticeDto): Promise<Notice> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
