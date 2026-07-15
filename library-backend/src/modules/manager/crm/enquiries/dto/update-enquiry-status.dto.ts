import { IsString, IsOptional, IsIn } from 'class-validator';
import { ENQUIRY_STATUSES } from '@/modules/manager/crm/enquiries/constants/enquiries.constants';

export class UpdateEnquiryStatusDto {
  @IsString()
  @IsIn(Object.values(ENQUIRY_STATUSES))
  status: string;

  @IsString()
  @IsOptional()
  reason?: string;
}
