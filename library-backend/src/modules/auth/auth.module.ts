import { Module } from '@nestjs/common';
import { SuperadminUsersModule } from '@/modules/superadmin/staff-users/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthJwtStrategy } from './strategies/auth-jwt.strategy';
import { AuthRefreshTokenStrategy } from './strategies/auth-refresh-token.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/core/entities/user.entity';
import { Role } from '@/core/entities/role.entity';
import { Branch } from '@/core/entities/branch.entity';
import { AuthJwtAuthGuard } from './guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from './guards/auth-roles.guard';
import { AuthRefreshTokenGuard } from './guards/auth-refresh-token.guard';

// Micro-Services
import { AuthLoginService } from './services/auth-login.service';
import { AuthRegisterService } from './services/auth-register.service';
import { AuthRefreshTokenService } from './services/auth-refresh-token.service';
import { AuthLogoutService } from './services/auth-logout.service';
import { AuthGetMeService } from './services/auth-get-me.service';
import { AuthForgotPasswordService } from './services/auth-forgot-password.service';
import { AuthResetPasswordService } from './services/auth-reset-password.service';
import { AuthJwtTokenGeneratorUtil } from './utils/auth-jwt-token-generator.util';

// Micro-Controllers
import { AuthLoginController } from './controllers/auth-login.controller';
import { AuthRegisterController } from './controllers/auth-register.controller';
import { AuthRefreshTokenController } from './controllers/auth-refresh-token.controller';
import { AuthLogoutController } from './controllers/auth-logout.controller';
import { AuthGetMeController } from './controllers/auth-get-me.controller';
import { AuthForgotPasswordController } from './controllers/auth-forgot-password.controller';
import { AuthResetPasswordController } from './controllers/auth-reset-password.controller';

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
    AuthLoginService,
    AuthRegisterService,
    AuthRefreshTokenService,
    AuthLogoutService,
    AuthGetMeService,
    AuthForgotPasswordService,
    AuthResetPasswordService,
    AuthJwtTokenGeneratorUtil,
    AuthJwtStrategy,
    AuthRefreshTokenStrategy,
    AuthJwtAuthGuard,
    AuthRolesGuard,
    AuthRefreshTokenGuard,
  ],
  controllers: [
    AuthLoginController,
    AuthRegisterController,
    AuthRefreshTokenController,
    AuthLogoutController,
    AuthGetMeController,
    AuthForgotPasswordController,
    AuthResetPasswordController,
  ],
  exports: [AuthJwtAuthGuard, AuthRolesGuard, AuthRefreshTokenGuard],
})
export class AuthModule {}
