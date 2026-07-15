import { IsString, IsOptional, IsEmail, IsNumber, IsIn } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsOptional()
  fullName?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  phone: string;

  @IsString()
  @IsOptional()
  parentPhone?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  college?: string;

  @IsString()
  @IsOptional()
  shift?: string;

  @IsString()
  @IsOptional()
  seat?: string;

  @IsString()
  @IsOptional()
  plan?: string;

  @IsNumber()
  @IsOptional()
  manualDiscount?: number;

  @IsNumber()
  @IsOptional()
  amountPaid?: number;

  @IsString()
  @IsOptional()
  @IsIn(['UPI', 'Cash', 'Card', 'Bank Transfer'])
  paymentMode?: string;

  @IsString()
  @IsOptional()
  transactionId?: string;
}
