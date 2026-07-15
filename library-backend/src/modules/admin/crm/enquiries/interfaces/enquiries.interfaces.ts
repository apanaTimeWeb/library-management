import { EnquiryStatus } from '../dtos/update-enquiry-status.dto';

export interface EnquiryFollowUp {
  date: Date;
  remark: string;
  by: string;
}

export interface EnquiryBase {
  id: string;
  name: string;
  phone: string;
  preferredShift?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  followUps?: EnquiryFollowUp[];
}
