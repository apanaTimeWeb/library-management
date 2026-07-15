import { IsString, IsOptional, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  parentPhone?: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty()
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

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  manualDiscount?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  amountPaid?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  paymentMode?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  transactionId?: string;
}
