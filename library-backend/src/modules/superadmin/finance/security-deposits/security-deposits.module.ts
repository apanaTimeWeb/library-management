import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityDeposit } from '@/core/entities/security-deposit.entity';

import { CreateSecurityDepositController } from './controllers/create-security-deposit.controller';
import { UpdateSecurityDepositController } from './controllers/update-security-deposit.controller';
import { DeleteSecurityDepositController } from './controllers/delete-security-deposit.controller';
import { GetAllSecurityDepositsController } from './controllers/get-all-security-deposits.controller';
import { GetSecurityDepositController } from './controllers/get-security-deposit.controller';

import { CreateSecurityDepositService } from './services/create-security-deposit.service';
import { UpdateSecurityDepositService } from './services/update-security-deposit.service';
import { DeleteSecurityDepositService } from './services/delete-security-deposit.service';
import { GetAllSecurityDepositsService } from './services/get-all-security-deposits.service';
import { GetSecurityDepositService } from './services/get-security-deposit.service';

@Module({
  imports: [TypeOrmModule.forFeature([SecurityDeposit])],
  controllers: [
    CreateSecurityDepositController,
    UpdateSecurityDepositController,
    DeleteSecurityDepositController,
    GetAllSecurityDepositsController,
    GetSecurityDepositController,
  ],
  providers: [
    CreateSecurityDepositService,
    UpdateSecurityDepositService,
    DeleteSecurityDepositService,
    GetAllSecurityDepositsService,
    GetSecurityDepositService,
  ],
  exports: [GetSecurityDepositService],
})
export class SuperadminSecurityDepositsModule {}
