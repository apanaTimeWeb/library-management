import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from '@/core/entities/document.entity';

import { DocumentsCreateController } from '@/modules/manager/documents/documents/controllers/documents-create.controller';
import { DocumentsUpdateController } from '@/modules/manager/documents/documents/controllers/documents-update.controller';
import { DocumentsDeleteController } from '@/modules/manager/documents/documents/controllers/documents-delete.controller';
import { DocumentsGetAllController } from '@/modules/manager/documents/documents/controllers/documents-get-all.controller';
import { DocumentsGetController } from '@/modules/manager/documents/documents/controllers/documents-get.controller';

import { DocumentsCreateService } from '@/modules/manager/documents/documents/services/documents-create.service';
import { DocumentsUpdateService } from '@/modules/manager/documents/documents/services/documents-update.service';
import { DocumentsDeleteService } from '@/modules/manager/documents/documents/services/documents-delete.service';
import { DocumentsGetAllService } from '@/modules/manager/documents/documents/services/documents-get-all.service';
import { DocumentsGetService } from '@/modules/manager/documents/documents/services/documents-get.service';

@Module({
  imports: [TypeOrmModule.forFeature([Document])],
  controllers: [
    DocumentsCreateController,
    DocumentsUpdateController,
    DocumentsDeleteController,
    DocumentsGetAllController,
    DocumentsGetController,
  ],
  providers: [
    DocumentsCreateService,
    DocumentsUpdateService,
    DocumentsDeleteService,
    DocumentsGetAllService,
    DocumentsGetService,
  ],
  exports: [DocumentsGetService],
})
export class ManagerDocumentsModule {}
