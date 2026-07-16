import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthResetPasswordDto {
  @ApiProperty({
    example: '123456',
    description: 'The OTP or reset token received by the user',
  })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({
    example: 'NewSecurePass!23',
    description: 'The new password for the user',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  newPassword: string;
}
