import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IDCard } from '@/core/entities/id-card.entity';

import { CreateIDCardController } from './controllers/create-idcard.controller';
import { UpdateIDCardController } from './controllers/update-idcard.controller';
import { DeleteIDCardController } from './controllers/delete-idcard.controller';
import { GetAllIDCardsController } from './controllers/get-all-id-cards.controller';
import { GetIDCardController } from './controllers/get-idcard.controller';

import { CreateIDCardService } from './services/create-idcard.service';
import { UpdateIDCardService } from './services/update-idcard.service';
import { DeleteIDCardService } from './services/delete-idcard.service';
import { GetAllIDCardsService } from './services/get-all-id-cards.service';
import { GetIDCardService } from './services/get-idcard.service';

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
export class ManagerIdCardsModule {}
