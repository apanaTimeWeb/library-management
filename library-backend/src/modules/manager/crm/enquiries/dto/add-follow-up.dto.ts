import { IsString, IsDateString, IsNotEmpty } from 'class-validator';

export class AddFollowUpDto {
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  remark: string;

  @IsString()
  @IsNotEmpty()
  by: string;
}
