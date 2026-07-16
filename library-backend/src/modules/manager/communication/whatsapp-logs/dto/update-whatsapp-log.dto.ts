import { PartialType } from '@nestjs/mapped-types';
import { CreateWhatsAppMessageDto } from '@/modules/manager/communication/whatsapp-logs/dto/create-whatsapp-log.dto';

export class UpdateWhatsAppMessageDto extends PartialType(CreateWhatsAppMessageDto) {}
