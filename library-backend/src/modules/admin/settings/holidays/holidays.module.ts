import { Module } from '@nestjs/common';
import { holidaysController } from './controllers/holidays.controller';
import { holidaysService } from './services/holidays.service';

@Module({
  controllers: [holidaysController],
  providers: [holidaysService],
})
export class holidaysModule {}
