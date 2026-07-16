import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WhatsAppMessage } from '@/core/entities/whatsapp-message.entity';

import { CreateWhatsAppMessageController } from './controllers/create-whatsapp-log.controller';
import { UpdateWhatsAppMessageController } from './controllers/update-whatsapp-log.controller';
import { DeleteWhatsAppMessageController } from './controllers/delete-whatsapp-log.controller';
import { GetAllWhatsAppMessagesController } from './controllers/get-all-whatsapp-logs.controller';
import { GetWhatsAppMessageController } from './controllers/get-whatsapp-log.controller';

import { CreateWhatsAppMessageService } from './services/create-whatsapp-log.service';
import { UpdateWhatsAppMessageService } from './services/update-whatsapp-log.service';
import { DeleteWhatsAppMessageService } from './services/delete-whatsapp-log.service';
import { GetAllWhatsAppMessagesService } from './services/get-all-whatsapp-logs.service';
import { GetWhatsAppMessageService } from './services/get-whatsapp-log.service';

@Module({
  imports: [TypeOrmModule.forFeature([WhatsAppMessage])],
  controllers: [
    CreateWhatsAppMessageController,
    UpdateWhatsAppMessageController,
    DeleteWhatsAppMessageController,
    GetAllWhatsAppMessagesController,
    GetWhatsAppMessageController,
  ],
  providers: [
    CreateWhatsAppMessageService,
    UpdateWhatsAppMessageService,
    DeleteWhatsAppMessageService,
    GetAllWhatsAppMessagesService,
    GetWhatsAppMessageService,
  ],
  exports: [GetWhatsAppMessageService],
})
export class ManagerWhatsAppMessagesModule {}
