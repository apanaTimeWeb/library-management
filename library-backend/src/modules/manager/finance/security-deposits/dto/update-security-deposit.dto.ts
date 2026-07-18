import { PartialType } from '@nestjs/mapped-types';
import { CreateSecurityDepositDto } from '@/modules/manager/finance/security-deposits/dto/create-security-deposit.dto';

export class UpdateSecurityDepositDto extends PartialType(CreateSecurityDepositDto) {}
