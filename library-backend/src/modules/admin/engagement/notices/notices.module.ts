import { Module } from '@nestjs/common';
import { noticesController } from './controllers/notices.controller';
import { noticesService } from './services/notices.service';

@Module({
  controllers: [noticesController],
  providers: [noticesService],
})
export class noticesModule {}
