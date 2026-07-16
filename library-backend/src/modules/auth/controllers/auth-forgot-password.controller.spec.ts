import { Test, TestingModule } from '@nestjs/testing';
import { AuthForgotPasswordController } from './auth-forgot-password.controller';
import { AuthForgotPasswordService } from '../services/auth-forgot-password.service';

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
