import { Module } from '@nestjs/common';
import { blacklistController } from './controllers/blacklist.controller';
import { blacklistService } from './services/blacklist.service';

@Module({
  controllers: [blacklistController],
  providers: [blacklistService],
})
export class blacklistModule {}
