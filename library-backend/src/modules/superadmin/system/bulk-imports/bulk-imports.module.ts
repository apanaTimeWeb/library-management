import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BulkImport } from '@/core/entities/bulk-import.entity';

import { CreateBulkImportController } from './controllers/create-bulk-import.controller';
import { UpdateBulkImportController } from './controllers/update-bulk-import.controller';
import { DeleteBulkImportController } from './controllers/delete-bulk-import.controller';
import { GetAllBulkImportsController } from './controllers/get-all-bulk-imports.controller';
import { GetBulkImportController } from './controllers/get-bulk-import.controller';

import { CreateBulkImportService } from './services/create-bulk-import.service';
import { UpdateBulkImportService } from './services/update-bulk-import.service';
import { DeleteBulkImportService } from './services/delete-bulk-import.service';
import { GetAllBulkImportsService } from './services/get-all-bulk-imports.service';
import { GetBulkImportService } from './services/get-bulk-import.service';

@Module({
  imports: [TypeOrmModule.forFeature([BulkImport])],
  controllers: [
    CreateBulkImportController,
    UpdateBulkImportController,
    DeleteBulkImportController,
    GetAllBulkImportsController,
    GetBulkImportController,
  ],
  providers: [
    CreateBulkImportService,
    UpdateBulkImportService,
    DeleteBulkImportService,
    GetAllBulkImportsService,
    GetBulkImportService,
  ],
  exports: [GetBulkImportService],
})
export class SuperadminBulkImportsModule {}
