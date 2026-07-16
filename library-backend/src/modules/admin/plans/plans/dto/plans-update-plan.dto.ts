import { PartialType } from '@nestjs/mapped-types';
import { PlansCreatePlanDto } from './plans-create-plan.dto';

export class PlansUpdatePlanDto extends PartialType(PlansCreatePlanDto) {}
