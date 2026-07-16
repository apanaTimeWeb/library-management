import { PartialType } from '@nestjs/swagger';
import { EnquiriesCreateEnquirieDto } from './create-enquirie.dto';

export class EnquiriesUpdateEnquirieDto extends PartialType(CreateEnquirieDto) {}
