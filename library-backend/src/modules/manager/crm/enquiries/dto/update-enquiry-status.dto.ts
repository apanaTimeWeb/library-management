import { IsString, IsOptional, IsIn } from 'class-validator';
import { ENQUIRY_STATUSES } from '../constants/enquiries.constants';

export class UpdateEnquiryStatusDto {
  @IsString()
  @IsIn(Object.values(ENQUIRY_STATUSES))
  status: string;

  @IsString()
  @IsOptional()
  reason?: string;
}
