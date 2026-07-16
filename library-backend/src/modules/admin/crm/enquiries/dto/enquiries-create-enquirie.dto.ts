import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EnquiriesCreateEnquirieDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
