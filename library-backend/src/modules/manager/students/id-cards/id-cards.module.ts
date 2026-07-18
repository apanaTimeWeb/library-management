import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IDCard } from '@/core/entities/id-card.entity';

import { IdCardsCreateIdcardController } from '@/modules/manager/students/id-cards/controllers/id-cards-create-idcard.controller';
import { IdCardsUpdateIdcardController } from '@/modules/manager/students/id-cards/controllers/id-cards-update-idcard.controller';
import { IdCardsDeleteIdcardController } from '@/modules/manager/students/id-cards/controllers/id-cards-delete-idcard.controller';
import { IdCardsGetAllController } from '@/modules/manager/students/id-cards/controllers/id-cards-get-all.controller';
import { IdCardsGetIdcardController } from '@/modules/manager/students/id-cards/controllers/id-cards-get-idcard.controller';

import { IdCardsCreateIdcardService } from '@/modules/manager/students/id-cards/services/id-cards-create-idcard.service';
import { IdCardsUpdateIdcardService } from '@/modules/manager/students/id-cards/services/id-cards-update-idcard.service';
import { IdCardsDeleteIdcardService } from '@/modules/manager/students/id-cards/services/id-cards-delete-idcard.service';
import { IdCardsGetAllService } from '@/modules/manager/students/id-cards/services/id-cards-get-all.service';
import { IdCardsGetIdcardService } from '@/modules/manager/students/id-cards/services/id-cards-get-idcard.service';

@Module({
  imports: [TypeOrmModule.forFeature([IDCard])],
  controllers: [
    IdCardsCreateIdcardController,
    IdCardsUpdateIdcardController,
    IdCardsDeleteIdcardController,
    IdCardsGetAllController,
    IdCardsGetIdcardController,
  ],
  providers: [
    IdCardsCreateIdcardService,
    IdCardsUpdateIdcardService,
    IdCardsDeleteIdcardService,
    IdCardsGetAllService,
    IdCardsGetIdcardService,
  ],
  exports: [IdCardsGetIdcardService],
})
export class ManagerIdCardsModule {}
