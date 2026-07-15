import { Test, TestingModule } from '@nestjs/testing';
import { ResetPasswordController } from './reset-password.controller';
import { ResetPasswordService } from '../services/reset-password.service';

describe('ResetPasswordController', () => {
  let controller: ResetPasswordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResetPasswordController],
      providers: [
        {
          provide: ResetPasswordService,
          useValue: {
            resetPassword: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ResetPasswordController>(ResetPasswordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
