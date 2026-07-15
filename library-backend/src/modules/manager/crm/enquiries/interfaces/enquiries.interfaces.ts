import { Enquiry } from '@/core/entities/enquiry.entity';

export interface EnquiryResponse {
  message?: string;
  enquiry?: Enquiry;
}

export interface FollowUpItem {
  date: Date;
  remark: string;
  by: string;
}
