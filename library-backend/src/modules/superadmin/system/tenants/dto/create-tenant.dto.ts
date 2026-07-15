import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  domain: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  adminEmail: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  status?: string;
}
