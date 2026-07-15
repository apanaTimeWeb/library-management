import { Module } from '@nestjs/common';
import { AdminPaymentsService } from './payments.service';
import { AdminPaymentsController } from './payments.controller';

@Module({
  providers: [AdminPaymentsService],
  controllers: [AdminPaymentsController],
})
export class AdminPaymentsModule {}
