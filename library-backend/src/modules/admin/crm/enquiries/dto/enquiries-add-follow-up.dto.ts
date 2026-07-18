import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EnquiriesAddFollowUpDto {
  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  remark: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  by: string;
}
