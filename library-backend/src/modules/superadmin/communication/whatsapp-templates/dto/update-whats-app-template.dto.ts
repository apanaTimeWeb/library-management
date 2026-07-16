import { PartialType } from '@nestjs/mapped-types';
import { CreateWhatsAppTemplateDto } from './create-whats-app-template.dto';

export class UpdateWhatsAppTemplateDto extends PartialType(CreateWhatsAppTemplateDto) {}
