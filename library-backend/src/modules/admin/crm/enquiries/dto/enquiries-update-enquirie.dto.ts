import { PartialType } from '@nestjs/swagger';
import { EnquiriesCreateEnquirieDto } from './enquiries-create-enquirie.dto';

export class EnquiriesUpdateEnquirieDto extends PartialType(EnquiriesCreateEnquirieDto) {}
