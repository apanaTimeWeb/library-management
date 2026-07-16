import { ApiTags } from '@nestjs/swagger';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthResetPasswordController } from '@/modules/auth/reset-password/controllers/auth-reset-password.controller';
import { AuthResetPasswordService } from '@/modules/auth/reset-password/services/auth-reset-password.service';

describe('AuthResetPasswordController', () => {
  let controller: AuthResetPasswordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthResetPasswordController],
      providers: [
        {
          provide: AuthResetPasswordService,
          useValue: {
            resetPassword: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthResetPasswordController>(AuthResetPasswordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
