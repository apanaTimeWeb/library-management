import { PartialType } from '@nestjs/swagger';
import { DailySettlementsCreateSettlementDto } from './daily-settlements-create-settlement.dto';
export class DailySettlementsUpdateSettlementDto extends PartialType(DailySettlementsCreateSettlementDto) {}