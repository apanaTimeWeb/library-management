import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WhatsAppMessage } from '@/core/entities/whatsapp-message.entity';

import { WhatsappLogsCreateController } from '@/modules/manager/communication/whatsapp-logs/controllers/whatsapp-logs-create.controller';
import { WhatsappLogsUpdateController } from '@/modules/manager/communication/whatsapp-logs/controllers/whatsapp-logs-update.controller';
import { WhatsappLogsDeleteController } from '@/modules/manager/communication/whatsapp-logs/controllers/whatsapp-logs-delete.controller';
import { WhatsappLogsGetAllController } from '@/modules/manager/communication/whatsapp-logs/controllers/whatsapp-logs-get-all.controller';
import { WhatsappLogsGetController } from '@/modules/manager/communication/whatsapp-logs/controllers/whatsapp-logs-get.controller';

import { WhatsappLogsCreateService } from '@/modules/manager/communication/whatsapp-logs/services/whatsapp-logs-create.service';
import { WhatsappLogsUpdateService } from '@/modules/manager/communication/whatsapp-logs/services/whatsapp-logs-update.service';
import { WhatsappLogsDeleteService } from '@/modules/manager/communication/whatsapp-logs/services/whatsapp-logs-delete.service';
import { WhatsappLogsGetAllService } from '@/modules/manager/communication/whatsapp-logs/services/whatsapp-logs-get-all.service';
import { WhatsappLogsGetService } from '@/modules/manager/communication/whatsapp-logs/services/whatsapp-logs-get.service';

@Module({
  imports: [TypeOrmModule.forFeature([WhatsAppMessage])],
  controllers: [
    WhatsappLogsCreateController,
    WhatsappLogsUpdateController,
    WhatsappLogsDeleteController,
    WhatsappLogsGetAllController,
    WhatsappLogsGetController,
  ],
  providers: [
    WhatsappLogsCreateService,
    WhatsappLogsUpdateService,
    WhatsappLogsDeleteService,
    WhatsappLogsGetAllService,
    WhatsappLogsGetService,
  ],
  exports: [WhatsappLogsGetService],
})
export class ManagerWhatsAppMessagesModule {}
