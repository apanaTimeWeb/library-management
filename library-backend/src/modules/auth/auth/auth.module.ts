import { Module } from '@nestjs/common';
import { AuthAuthService } from './auth.service';
import { AuthAuthController } from './auth.controller';
import { SuperadminUsersModule } from '../../superadmin/staff-users/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../core/entities/user.entity';
import { Role } from '../../../core/entities/role.entity';
import { Branch } from '../../../core/entities/branch.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

@Module({
  imports: [
    SuperadminUsersModule,
    PassportModule,
    ConfigModule,
    TypeOrmModule.forFeature([User, Role, Branch]),
    // Access Token JWT — 15 minute expiry
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        if (!secret) throw new Error('JWT_SECRET is not configured!');
        return {
          secret,
          signOptions: { expiresIn: '15m' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthAuthService,
    JwtStrategy,
    RefreshTokenStrategy,
    JwtAuthGuard,
    RolesGuard,
    RefreshTokenGuard,
  ],
  controllers: [AuthAuthController],
  exports: [AuthAuthService, JwtAuthGuard, RolesGuard, RefreshTokenGuard],
})
export class AuthAuthModule {}
