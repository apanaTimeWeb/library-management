import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEnquirieDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
