import { PartialType } from '@nestjs/mapped-types';
import { CreateSecurityDepositDto } from './create-security-deposit.dto';

export class UpdateSecurityDepositDto extends PartialType(CreateSecurityDepositDto) {}
