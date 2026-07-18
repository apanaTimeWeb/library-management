import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Library } from '@/core/entities/library.entity';

import { CreateLibraryController } from './controllers/create-library.controller';
import { UpdateLibraryController } from './controllers/update-library.controller';
import { DeleteLibraryController } from './controllers/delete-library.controller';
import { GetAllLibrariesController } from './controllers/get-all-libraries.controller';
import { GetLibraryController } from './controllers/get-library.controller';

import { CreateLibraryService } from './services/create-library.service';
import { UpdateLibraryService } from './services/update-library.service';
import { DeleteLibraryService } from './services/delete-library.service';
import { GetAllLibrariesService } from './services/get-all-libraries.service';
import { GetLibraryService } from './services/get-library.service';

@Module({
  imports: [TypeOrmModule.forFeature([Library])],
  controllers: [
    CreateLibraryController,
    UpdateLibraryController,
    DeleteLibraryController,
    GetAllLibrariesController,
    GetLibraryController,
  ],
  providers: [
    CreateLibraryService,
    UpdateLibraryService,
    DeleteLibraryService,
    GetAllLibrariesService,
    GetLibraryService,
  ],
  exports: [GetLibraryService],
})
export class SuperadminLibrariesModule {}
