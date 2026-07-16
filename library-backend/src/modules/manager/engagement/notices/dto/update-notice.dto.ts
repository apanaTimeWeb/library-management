import { PartialType } from '@nestjs/mapped-types';
import { CreateNoticeDto } from '@/modules/manager/engagement/notices/dto/create-notice.dto';

export class UpdateNoticeDto extends PartialType(CreateNoticeDto) {}
