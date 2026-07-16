import { Test, TestingModule } from '@nestjs/testing';
import { AuthLoginController } from './auth-login.controller';
import { AuthLoginService } from '../services/auth-login.service';

describe('AuthLoginController', () => {
  let controller: AuthLoginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthLoginController],
      providers: [
        {
          provide: AuthLoginService,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthLoginController>(AuthLoginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
