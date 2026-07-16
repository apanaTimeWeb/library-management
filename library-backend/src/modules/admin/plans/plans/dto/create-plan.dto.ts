import { IsString, IsNumber, IsArray, IsEnum, Min, MinLength, MaxLength } from 'class-validator';

export class CreatePlanDto {
  @IsString()
  @MinLength(2)
  @MaxLength(60)
  name: string;

  @IsNumber()
  @Min(0.01)
  price: number;

  @IsString()
  @MinLength(2)
  duration: string;

  @IsNumber()
  @Min(1)
  durationDays: number;

  @IsArray()
  @IsString({ each: true })
  features: string[];

  @IsEnum(['Active', 'Inactive'])
  status: 'Active' | 'Inactive';
}
