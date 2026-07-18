import { PartialType } from '@nestjs/mapped-types';
import { CreateWhatsAppMessageDto } from './create-whats-app-message.dto';

export class UpdateWhatsAppMessageDto extends PartialType(CreateWhatsAppMessageDto) {}
