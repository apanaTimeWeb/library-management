import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/core/entities/user.entity';
import { AuthResetPasswordDto } from '../dto/auth-reset-password.dto';
import * as bcrypt from 'bcrypt';
import { AUTH_CONSTANTS } from '../constants/auth.constants';

@Injectable()
export class AuthResetPasswordService {
  private readonly logger = new Logger(AuthResetPasswordService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async resetPassword(resetPasswordDto: AuthResetPasswordDto): Promise<any> {
    const { token, newPassword } = resetPasswordDto;

    // Here you would verify the token against the database or Redis cache
    // We are mocking verification for this implementation.
    const mockExpectedToken = '123456';
    if (token !== mockExpectedToken) {
      this.logger.warn(`Invalid reset token provided: ${token}`);
      throw new BadRequestException('Invalid or expired reset token');
    }

    // Find the user associated with this token. Since it's a mock, we'll just pick the first user for demo,
    // but in a real scenario, you find by the resetToken.
    const user = await this.userRepository.findOne({ where: {} });
    if (!user) {
      throw new BadRequestException('Invalid user');
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      AUTH_CONSTANTS.BCRYPT_COST || 10,
    );
    user.password = hashedPassword;

    await this.userRepository.save(user);
    this.logger.log(`Password reset successfully for user ${user.id}`);

    return {
      success: true,
      message: 'Password has been reset successfully',
    };
  }
}
