import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/core/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { AUTH_CONSTANTS } from '@/modules/auth/session/constants/auth.constants';

@Injectable()
export class AuthSeeder {
  private readonly logger = new Logger(AuthSeeder.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seed() {
    this.logger.log('Seeding Default Superadmin...');
    const existingUser = await this.userRepository.findOne({
      where: { phone: '1234567890' },
    });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(
        'superadmin123',
        AUTH_CONSTANTS.BCRYPT_COST || 10,
      );
      const newUser = this.userRepository.create({
        name: 'Super Admin',
        phone: '1234567890',
        email: 'superadmin@example.com',
        password: hashedPassword,
        // user role should probably be associated by Relation but we can set basic properties
        isActive: true,
      });
      await this.userRepository.save(newUser);
      this.logger.log('Default superadmin seeded successfully.');
    } else {
      this.logger.log('Default superadmin already exists. Skipping.');
    }
  }
}
