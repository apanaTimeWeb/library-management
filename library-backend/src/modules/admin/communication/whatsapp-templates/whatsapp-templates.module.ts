import { Module } from '@nestjs/common';
import { whatsapptemplatesController } from './controllers/whatsapp-templates.controller';
import { whatsapptemplatesService } from './services/whatsapp-templates.service';

@Module({
  controllers: [whatsapptemplatesController],
  providers: [whatsapptemplatesService],
})
export class whatsapptemplatesModule {}
