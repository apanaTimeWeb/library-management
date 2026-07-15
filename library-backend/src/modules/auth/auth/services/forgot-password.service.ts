import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/core/entities/user.entity';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';

@Injectable()
export class ForgotPasswordService {
  private readonly logger = new Logger(ForgotPasswordService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async processForgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<any> {
    const { phone } = forgotPasswordDto;
    const user = await this.userRepository.findOne({ where: { phone } });

    if (!user) {
      // In a real system, you might want to silently return success to avoid user enumeration
      // But for this project, let's log and proceed.
      this.logger.warn(
        `Password reset requested for non-existent phone: ${phone}`,
      );
      return {
        success: true,
        message: 'If the phone number is registered, an OTP has been sent.',
      };
    }

    // Mock sending OTP / Reset Token
    // Here we would integrate with the communication module (SMS/Email)
    const mockResetToken = '123456';
    this.logger.log(
      `Generated mock reset token ${mockResetToken} for user ${user.id}`,
    );

    // Save the token to the database or Redis cache here (usually hashed or TTL attached)
    // user.resetToken = mockResetToken;
    // await this.userRepository.save(user);

    return {
      success: true,
      message: 'If the phone number is registered, an OTP has been sent.',
    };
  }
}
