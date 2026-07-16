import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from '@/core/entities/plan.entity';

// Controllers
import { PlansCreatePlanController } from './controllers/create-plan.controller';
import { PlansUpdatePlanController } from './controllers/update-plan.controller';
import { PlansDeletePlanController } from './controllers/delete-plan.controller';
import { PlansGetAllController } from './controllers/get-all-plans.controller';
import { PlansGetPlanController } from './controllers/get-plan.controller';

// Services
import { PlansCreatePlanService } from './services/create-plan.service';
import { PlansUpdatePlanService } from './services/update-plan.service';
import { PlansDeletePlanService } from './services/delete-plan.service';
import { PlansGetAllService } from './services/get-all-plans.service';
import { PlansGetPlanService } from './services/get-plan.service';

@Module({
  imports: [TypeOrmModule.forFeature([Plan])],
  controllers: [PlansCreatePlanController, PlansUpdatePlanController, PlansDeletePlanController, PlansGetAllController, PlansGetPlanController, ],
  providers: [PlansCreatePlanService, PlansUpdatePlanService, PlansDeletePlanService, PlansGetAllService, PlansGetPlanService, ],
  exports: [PlansGetPlanService],
})
export class PlansAdminModule {}
