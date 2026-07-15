import { Module } from '@nestjs/common';
import { SuperadminLibrariesController } from './libraries.controller';
import { SuperadminLibrariesService } from './libraries.service';

@Module({
  controllers: [SuperadminLibrariesController],
  providers: [SuperadminLibrariesService],
})
export class SuperadminLibrariesModule {}
