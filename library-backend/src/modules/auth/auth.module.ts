import { Module } from '@nestjs/common';
import { SuperadminUsersModule } from '@/modules/superadmin/staff-users/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthJwtStrategy } from '@/modules/auth/session/strategies/auth-jwt.strategy';
import { AuthRefreshTokenStrategy } from '@/modules/auth/session/strategies/auth-refresh-token.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/core/entities/user.entity';
import { Role } from '@/core/entities/role.entity';
import { Branch } from '@/core/entities/branch.entity';
import { AuthJwtAuthGuard } from '@/modules/auth/session/guards/auth-jwt-auth.guard';
import { AuthRolesGuard } from '@/modules/auth/session/guards/auth-roles.guard';
import { AuthRefreshTokenGuard } from '@/modules/auth/session/guards/auth-refresh-token.guard';

// Micro-Services
import { AuthLoginService } from '@/modules/auth/login/services/login.service';
import { AuthRegisterService } from '@/modules/auth/signup/services/signup.service';
import { AuthRefreshTokenService } from '@/modules/auth/session/services/refresh-token.service';
import { AuthLogoutService } from '@/modules/auth/session/services/logout.service';
import { AuthGetMeService } from '@/modules/auth/session/services/get-me.service';
import { AuthForgotPasswordService } from '@/modules/auth/forgot-password/services/forgot-password.service';
import { AuthResetPasswordService } from '@/modules/auth/reset-password/services/reset-password.service';
import { AuthJwtTokenGeneratorUtil } from '@/modules/auth/session/utils/auth-jwt-token-generator.util';

// Micro-Controllers
import { AuthLoginController } from '@/modules/auth/login/controllers/login.controller';
import { AuthRegisterController } from '@/modules/auth/signup/controllers/signup.controller';
import { AuthRefreshTokenController } from '@/modules/auth/session/controllers/refresh-token.controller';
import { AuthLogoutController } from '@/modules/auth/session/controllers/logout.controller';
import { AuthGetMeController } from '@/modules/auth/session/controllers/get-me.controller';
import { AuthForgotPasswordController } from '@/modules/auth/forgot-password/controllers/forgot-password.controller';
import { AuthResetPasswordController } from '@/modules/auth/reset-password/controllers/reset-password.controller';

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
