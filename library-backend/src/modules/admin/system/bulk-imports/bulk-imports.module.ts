import { Module } from '@nestjs/common';
import { bulkimportsController } from './controllers/bulk-imports.controller';
import { bulkimportsService } from './services/bulk-imports.service';

@Module({
  controllers: [bulkimportsController],
  providers: [bulkimportsService],
})
export class bulkimportsModule {}
