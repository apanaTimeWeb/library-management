import { PartialType } from '@nestjs/mapped-types';
import { ComplaintsCreateComplaintDto } from './create-complaint.dto';

export class ComplaintsUpdateComplaintDto extends PartialType(CreateComplaintDto) {}
