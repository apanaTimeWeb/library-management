import { PartialType } from '@nestjs/mapped-types';
import { PlansCreatePlanDto } from './create-plan.dto';

export class PlansUpdatePlanDto extends PartialType(CreatePlanDto) {}
