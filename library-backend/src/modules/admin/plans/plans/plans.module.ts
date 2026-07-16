import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from '@/core/entities/plan.entity';

// Controllers
import { PlansCreatePlanController } from './controllers/plans-create-plan.controller';
import { PlansUpdatePlanController } from './controllers/plans-update-plan.controller';
import { PlansDeletePlanController } from './controllers/plans-delete-plan.controller';
import { PlansGetAllController } from './controllers/plans-get-all-plans.controller';
import { PlansGetPlanController } from './controllers/plans-get-plan.controller';

// Services
import { PlansCreatePlanService } from './services/plans-create-plan.service';
import { PlansUpdatePlanService } from './services/plans-update-plan.service';
import { PlansDeletePlanService } from './services/plans-delete-plan.service';
import { PlansGetAllService } from './services/plans-get-all-plans.service';
import { PlansGetPlanService } from './services/plans-get-plan.service';

@Module({
  imports: [TypeOrmModule.forFeature([Plan])],
  controllers: [PlansCreatePlanController, PlansUpdatePlanController, PlansDeletePlanController, PlansGetAllController, PlansGetPlanController, ],
  providers: [PlansCreatePlanService, PlansUpdatePlanService, PlansDeletePlanService, PlansGetAllService, PlansGetPlanService, ],
  exports: [PlansGetPlanService],
})
export class PlansAdminModule {}
