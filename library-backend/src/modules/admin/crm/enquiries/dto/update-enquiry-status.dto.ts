import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum EnquiryStatus {
  NEW = 'new',
  VISITED = 'visited',
  INTERESTED = 'interested',
  CONVERTED = 'converted',
  LOST = 'lost',
}

export class UpdateEnquiryStatusDto {
  @ApiProperty({ enum: EnquiryStatus })
  @IsEnum(EnquiryStatus)
  @IsNotEmpty()
  status: EnquiryStatus;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  reason?: string;
}
