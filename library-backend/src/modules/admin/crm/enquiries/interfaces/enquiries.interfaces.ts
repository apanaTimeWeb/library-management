import { EnquiryStatus } from '@/modules/admin/crm/enquiries/dto/enquiries-update-enquiry-status.dto';

export interface EnquiriesEnquiryFollowUp {
  date: Date;
  remark: string;
  by: string;
}

export interface EnquiriesEnquiryBase {
  id: string;
  name: string;
  phone: string;
  preferredShift?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  followUps?: EnquiriesEnquiryFollowUp[];
}
