import { ApiTags } from '@nestjs/swagger';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthForgotPasswordController } from '@/modules/auth/forgot-password/controllers/auth-forgot-password.controller';
import { AuthForgotPasswordService } from '@/modules/auth/forgot-password/services/auth-forgot-password.service';

describe('AuthForgotPasswordController', () => {
  let controller: AuthForgotPasswordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthForgotPasswordController],
      providers: [
        {
          provide: AuthForgotPasswordService,
          useValue: {
            processForgotPassword: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthForgotPasswordController>(AuthForgotPasswordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
