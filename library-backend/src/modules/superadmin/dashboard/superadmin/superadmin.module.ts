import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from '@/core/entities/tenant.entity';
import { Branch } from '@/core/entities/branch.entity';
import { User } from '@/core/entities/user.entity';

// Micro-Services
import { DashboardService } from './services/dashboard.service';
import { GetLibrariesService } from '@/modules/superadmin/libraries/dashboard/services/get-libraries.service';
import { UpdateLibraryService } from '@/modules/superadmin/libraries/dashboard/services/update-library.service';
import { UpdateLibraryStatusService } from '@/modules/superadmin/libraries/dashboard/services/update-library-status.service';

// Micro-Controllers
import { DashboardController } from './controllers/dashboard.controller';
import { GetLibrariesController } from '@/modules/superadmin/libraries/dashboard/controllers/get-libraries.controller';
import { UpdateLibraryController } from '@/modules/superadmin/libraries/dashboard/controllers/update-library.controller';
import { UpdateLibraryStatusController } from '@/modules/superadmin/libraries/dashboard/controllers/update-library-status.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant, Branch, User])],
  providers: [
    DashboardService,
    GetLibrariesService,
    UpdateLibraryService,
    UpdateLibraryStatusService,
  ],
  controllers: [
    DashboardController,
    GetLibrariesController,
    UpdateLibraryController,
    UpdateLibraryStatusController,
  ],
})
export class SuperadminModule {}
