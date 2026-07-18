import { Module } from '@nestjs/common';
import { whatsappmessagesController } from './controllers/whatsapp-messages.controller';
import { whatsappmessagesService } from './services/whatsapp-messages.service';

@Module({
  controllers: [whatsappmessagesController],
  providers: [whatsappmessagesService],
})
export class whatsappmessagesModule {}
