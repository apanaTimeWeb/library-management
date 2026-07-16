import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IDCard } from '@/core/entities/id-card.entity';

import { IdCardsCreateIDCardController } from './controllers/create-id-card.controller';
import { IdCardsUpdateIDCardController } from './controllers/update-id-card.controller';
import { IdCardsDeleteIDCardController } from './controllers/delete-id-card.controller';
import { IdCardsGetAllIDCardsController } from './controllers/get-all-id-cards.controller';
import { IdCardsGetIDCardController } from './controllers/get-id-card.controller';

import { IdCardsCreateIDCardService } from './services/create-id-card.service';
import { IdCardsUpdateIDCardService } from './services/update-id-card.service';
import { IdCardsDeleteIDCardService } from './services/delete-id-card.service';
import { IdCardsGetAllIDCardsService } from './services/get-all-id-cards.service';
import { IdCardsGetIDCardService } from './services/get-id-card.service';

@Module({
  imports: [TypeOrmModule.forFeature([IDCard])],
  controllers: [IdCardsCreateIDCardController, IdCardsUpdateIDCardController, IdCardsDeleteIDCardController, IdCardsGetAllIDCardsController, IdCardsGetIDCardController, ],
  providers: [IdCardsCreateIDCardService, IdCardsUpdateIDCardService, IdCardsDeleteIDCardService, IdCardsGetAllIDCardsService, IdCardsGetIDCardService, ],
  exports: [IdCardsGetIDCardService],
})
export class IdCardsAdminIDCardsModule {}
