import { Test, TestingModule } from '@nestjs/testing';
import { AuthResetPasswordController } from './auth-reset-password.controller';
import { AuthResetPasswordService } from '../services/auth-reset-password.service';

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
