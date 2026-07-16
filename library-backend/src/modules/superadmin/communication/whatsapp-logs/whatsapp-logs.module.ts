import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WhatsAppMessage } from '@/core/entities/whatsapp-message.entity';

import { CreateWhatsAppMessageController } from './controllers/create-whats-app-message.controller';
import { UpdateWhatsAppMessageController } from './controllers/update-whats-app-message.controller';
import { DeleteWhatsAppMessageController } from './controllers/delete-whats-app-message.controller';
import { GetAllWhatsAppMessagesController } from './controllers/get-all-whatsapp-logs.controller';
import { GetWhatsAppMessageController } from './controllers/get-whats-app-message.controller';

import { CreateWhatsAppMessageService } from './services/create-whats-app-message.service';
import { UpdateWhatsAppMessageService } from './services/update-whats-app-message.service';
import { DeleteWhatsAppMessageService } from './services/delete-whats-app-message.service';
import { GetAllWhatsAppMessagesService } from './services/get-all-whatsapp-logs.service';
import { GetWhatsAppMessageService } from './services/get-whats-app-message.service';

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
export class SuperadminWhatsappLogsModule {}
