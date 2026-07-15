import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({ example: '9876543210', description: 'The registered phone number of the user' })
  @IsString()
  @IsNotEmpty()
  phone: string;
}
