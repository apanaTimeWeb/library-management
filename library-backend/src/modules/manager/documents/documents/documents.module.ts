import { Module } from '@nestjs/common';
import { ManagerDocumentsController } from './documents.controller';
import { ManagerDocumentsService } from './documents.service';

@Module({
  controllers: [ManagerDocumentsController],
  providers: [ManagerDocumentsService],
})
export class ManagerDocumentsModule {}
