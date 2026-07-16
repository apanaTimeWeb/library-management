import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from '@/core/entities/plan.entity';

// Controllers
import { CreatePlanController } from './controllers/create-plan.controller';
import { UpdatePlanController } from './controllers/update-plan.controller';
import { DeletePlanController } from './controllers/delete-plan.controller';
import { GetAllPlansController } from './controllers/get-all-plans.controller';
import { GetPlanController } from './controllers/get-plan.controller';

// Services
import { CreatePlanService } from './services/create-plan.service';
import { UpdatePlanService } from './services/update-plan.service';
import { DeletePlanService } from './services/delete-plan.service';
import { GetAllPlansService } from './services/get-all-plans.service';
import { GetPlanService } from './services/get-plan.service';

@Module({
  imports: [TypeOrmModule.forFeature([Plan])],
  controllers: [
    CreatePlanController,
    UpdatePlanController,
    DeletePlanController,
    GetAllPlansController,
    GetPlanController,
  ],
  providers: [
    CreatePlanService,
    UpdatePlanService,
    DeletePlanService,
    GetAllPlansService,
    GetPlanService,
  ],
  exports: [GetPlanService],
})
export class AdminPlansModule {}
