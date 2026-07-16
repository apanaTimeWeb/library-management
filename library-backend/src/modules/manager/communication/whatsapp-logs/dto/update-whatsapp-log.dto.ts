import { PartialType } from '@nestjs/mapped-types';
import { CreateWhatsAppMessageDto } from './create-whatsapp-log.dto';

export class UpdateWhatsAppMessageDto extends PartialType(CreateWhatsAppMessageDto) {}
