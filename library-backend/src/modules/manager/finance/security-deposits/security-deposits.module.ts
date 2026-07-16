import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityDeposit } from '@/core/entities/security-deposit.entity';

import { SecurityDepositsCreateController } from '@/modules/manager/finance/security-deposits/controllers/security-deposits-create.controller';
import { SecurityDepositsUpdateController } from '@/modules/manager/finance/security-deposits/controllers/security-deposits-update.controller';
import { SecurityDepositsDeleteController } from '@/modules/manager/finance/security-deposits/controllers/security-deposits-delete.controller';
import { SecurityDepositsGetAllController } from '@/modules/manager/finance/security-deposits/controllers/security-deposits-get-all.controller';
import { SecurityDepositsGetController } from '@/modules/manager/finance/security-deposits/controllers/security-deposits-get.controller';

import { SecurityDepositsCreateService } from '@/modules/manager/finance/security-deposits/services/security-deposits-create.service';
import { SecurityDepositsUpdateService } from '@/modules/manager/finance/security-deposits/services/security-deposits-update.service';
import { SecurityDepositsDeleteService } from '@/modules/manager/finance/security-deposits/services/security-deposits-delete.service';
import { SecurityDepositsGetAllService } from '@/modules/manager/finance/security-deposits/services/security-deposits-get-all.service';
import { SecurityDepositsGetService } from '@/modules/manager/finance/security-deposits/services/security-deposits-get.service';

@Module({
  imports: [TypeOrmModule.forFeature([SecurityDeposit])],
  controllers: [
    SecurityDepositsCreateController,
    SecurityDepositsUpdateController,
    SecurityDepositsDeleteController,
    SecurityDepositsGetAllController,
    SecurityDepositsGetController,
  ],
  providers: [
    SecurityDepositsCreateService,
    SecurityDepositsUpdateService,
    SecurityDepositsDeleteService,
    SecurityDepositsGetAllService,
    SecurityDepositsGetService,
  ],
  exports: [SecurityDepositsGetService],
})
export class ManagerSecurityDepositsModule {}
