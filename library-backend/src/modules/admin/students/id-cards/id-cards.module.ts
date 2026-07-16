import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IDCard } from '@/core/entities/id-card.entity';

import { CreateIDCardController } from './controllers/create-id-card.controller';
import { UpdateIDCardController } from './controllers/update-id-card.controller';
import { DeleteIDCardController } from './controllers/delete-id-card.controller';
import { GetAllIDCardsController } from './controllers/get-all-id-cards.controller';
import { GetIDCardController } from './controllers/get-id-card.controller';

import { CreateIDCardService } from './services/create-id-card.service';
import { UpdateIDCardService } from './services/update-id-card.service';
import { DeleteIDCardService } from './services/delete-id-card.service';
import { GetAllIDCardsService } from './services/get-all-id-cards.service';
import { GetIDCardService } from './services/get-id-card.service';

@Module({
  imports: [TypeOrmModule.forFeature([IDCard])],
  controllers: [
    CreateIDCardController,
    UpdateIDCardController,
    DeleteIDCardController,
    GetAllIDCardsController,
    GetIDCardController,
  ],
  providers: [
    CreateIDCardService,
    UpdateIDCardService,
    DeleteIDCardService,
    GetAllIDCardsService,
    GetIDCardService,
  ],
  exports: [GetIDCardService],
})
export class AdminIDCardsModule {}
