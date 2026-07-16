import { PartialType } from '@nestjs/mapped-types';
import { CreateDailySettlementDto } from './create-daily-settlement.dto';

export class UpdateDailySettlementDto extends PartialType(CreateDailySettlementDto) {}
