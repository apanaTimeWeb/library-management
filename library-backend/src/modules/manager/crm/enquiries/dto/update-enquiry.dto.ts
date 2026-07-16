import { PartialType } from '@nestjs/mapped-types';
import { CreateEnquiryDto } from '@/modules/manager/crm/enquiries/dto/create-enquiry.dto';

export class UpdateEnquiryDto extends PartialType(CreateEnquiryDto) {}
