import { Module } from '@nestjs/common';
import { SuperadminUsersModule } from '@/modules/superadmin/staff-users/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/core/entities/user.entity';
import { Role } from '@/core/entities/role.entity';
import { Branch } from '@/core/entities/branch.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

// Micro-Services
import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';
import { RefreshTokenService } from './services/refresh-token.service';
import { LogoutService } from './services/logout.service';
import { GetMeService } from './services/get-me.service';
import { ForgotPasswordService } from './services/forgot-password.service';
import { ResetPasswordService } from './services/reset-password.service';
import { JwtTokenGeneratorUtil } from './utils/jwt-token-generator.util';

// Micro-Controllers
import { LoginController } from './controllers/login.controller';
import { RegisterController } from './controllers/register.controller';
import { RefreshTokenController } from './controllers/refresh-token.controller';
import { LogoutController } from './controllers/logout.controller';
import { GetMeController } from './controllers/get-me.controller';
import { ForgotPasswordController } from './controllers/forgot-password.controller';
import { ResetPasswordController } from './controllers/reset-password.controller';

@Module({
  imports: [
    SuperadminUsersModule,
    PassportModule,
    ConfigModule,
    TypeOrmModule.forFeature([User, Role, Branch]),
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
    LoginService,
    RegisterService,
    RefreshTokenService,
    LogoutService,
    GetMeService,
    ForgotPasswordService,
    ResetPasswordService,
    JwtTokenGeneratorUtil,
    JwtStrategy,
    RefreshTokenStrategy,
    JwtAuthGuard,
    RolesGuard,
    RefreshTokenGuard,
  ],
  controllers: [
    LoginController,
    RegisterController,
    RefreshTokenController,
    LogoutController,
    GetMeController,
    ForgotPasswordController,
    ResetPasswordController,
  ],
  exports: [JwtAuthGuard, RolesGuard, RefreshTokenGuard],
})
export class AuthAuthModule {}
