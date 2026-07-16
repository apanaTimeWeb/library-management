import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EnquiryCreateDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '+91 9876543210' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'morning' })
  @IsString()
  @IsNotEmpty()
  preferredShift: string;

  @ApiProperty({ example: 'I want to join the morning shift', required: false })
  @IsString()
  @IsOptional()
  message?: string;
}
