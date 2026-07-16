import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from '@/core/entities/document.entity';

import { CreateDocumentController } from './controllers/create-document.controller';
import { UpdateDocumentController } from './controllers/update-document.controller';
import { DeleteDocumentController } from './controllers/delete-document.controller';
import { GetAllDocumentsController } from './controllers/get-all-documents.controller';
import { GetDocumentController } from './controllers/get-document.controller';

import { CreateDocumentService } from './services/create-document.service';
import { UpdateDocumentService } from './services/update-document.service';
import { DeleteDocumentService } from './services/delete-document.service';
import { GetAllDocumentsService } from './services/get-all-documents.service';
import { GetDocumentService } from './services/get-document.service';

@Module({
  imports: [TypeOrmModule.forFeature([Document])],
  controllers: [
    CreateDocumentController,
    UpdateDocumentController,
    DeleteDocumentController,
    GetAllDocumentsController,
    GetDocumentController,
  ],
  providers: [
    CreateDocumentService,
    UpdateDocumentService,
    DeleteDocumentService,
    GetAllDocumentsService,
    GetDocumentService,
  ],
  exports: [GetDocumentService],
})
export class ManagerDocumentsModule {}
