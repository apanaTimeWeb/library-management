import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WhatsAppTemplate } from '@/core/entities/whatsapp-template.entity';

import { CreateWhatsAppTemplateController } from './controllers/create-whats-app-template.controller';
import { UpdateWhatsAppTemplateController } from './controllers/update-whats-app-template.controller';
import { DeleteWhatsAppTemplateController } from './controllers/delete-whats-app-template.controller';
import { GetAllWhatsAppTemplatesController } from './controllers/get-all-whatsapp-templates.controller';
import { GetWhatsAppTemplateController } from './controllers/get-whats-app-template.controller';

import { CreateWhatsAppTemplateService } from './services/create-whats-app-template.service';
import { UpdateWhatsAppTemplateService } from './services/update-whats-app-template.service';
import { DeleteWhatsAppTemplateService } from './services/delete-whats-app-template.service';
import { GetAllWhatsAppTemplatesService } from './services/get-all-whatsapp-templates.service';
import { GetWhatsAppTemplateService } from './services/get-whats-app-template.service';

@Module({
  imports: [TypeOrmModule.forFeature([WhatsAppTemplate])],
  controllers: [
    CreateWhatsAppTemplateController,
    UpdateWhatsAppTemplateController,
    DeleteWhatsAppTemplateController,
    GetAllWhatsAppTemplatesController,
    GetWhatsAppTemplateController,
  ],
  providers: [
    CreateWhatsAppTemplateService,
    UpdateWhatsAppTemplateService,
    DeleteWhatsAppTemplateService,
    GetAllWhatsAppTemplatesService,
    GetWhatsAppTemplateService,
  ],
  exports: [GetWhatsAppTemplateService],
})
export class SuperadminWhatsappTemplatesModule {}
