import { ApiTags } from '@nestjs/swagger';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthLoginController } from '@/modules/auth/login/controllers/auth-login.controller';
import { AuthLoginService } from '@/modules/auth/login/services/auth-login.service';

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
