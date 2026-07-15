import { PartialType } from '@nestjs/swagger';
import { CreateEnquirieDto } from './create-enquirie.dto';

export class UpdateEnquirieDto extends PartialType(CreateEnquirieDto) {}
