import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsNumber,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  parentPhone?: string;

  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  college?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  shift: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  seat: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  plan: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  manualDiscount?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  amountPaid?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  paymentMode?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  transactionId?: string;
}
