import { IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLibraryStatusDto {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
