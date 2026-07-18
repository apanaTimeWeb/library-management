import { PartialType } from '@nestjs/mapped-types';
import { ComplaintsCreateComplaintDto } from './complaints-create-complaint.dto';

export class ComplaintsUpdateComplaintDto extends PartialType(ComplaintsCreateComplaintDto) {}
