import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IDCard } from '@/core/entities/id-card.entity';

import { IdCardsCreateIDCardController } from './controllers/id-cards-create-id-card.controller';
import { IdCardsUpdateIDCardController } from './controllers/id-cards-update-id-card.controller';
import { IdCardsDeleteIDCardController } from './controllers/id-cards-delete-id-card.controller';
import { IdCardsGetAllIDCardsController } from './controllers/id-cards-get-all-id-cards.controller';
import { IdCardsGetIDCardController } from './controllers/id-cards-get-id-card.controller';

import { IdCardsCreateIDCardService } from './services/id-cards-create-id-card.service';
import { IdCardsUpdateIDCardService } from './services/id-cards-update-id-card.service';
import { IdCardsDeleteIDCardService } from './services/id-cards-delete-id-card.service';
import { IdCardsGetAllIDCardsService } from './services/id-cards-get-all-id-cards.service';
import { IdCardsGetIDCardService } from './services/id-cards-get-id-card.service';

@Module({
  imports: [TypeOrmModule.forFeature([IDCard])],
  controllers: [IdCardsCreateIDCardController, IdCardsUpdateIDCardController, IdCardsDeleteIDCardController, IdCardsGetAllIDCardsController, IdCardsGetIDCardController, ],
  providers: [IdCardsCreateIDCardService, IdCardsUpdateIDCardService, IdCardsDeleteIDCardService, IdCardsGetAllIDCardsService, IdCardsGetIDCardService, ],
  exports: [IdCardsGetIDCardService],
})
export class IdCardsAdminIDCardsModule {}
