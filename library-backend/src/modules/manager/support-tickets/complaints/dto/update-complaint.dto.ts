import { PartialType } from '@nestjs/mapped-types';
import { CreateComplaintDto } from '@/modules/manager/support-tickets/complaints/dto/create-complaint.dto';

export class UpdateComplaintDto extends PartialType(CreateComplaintDto) {}
