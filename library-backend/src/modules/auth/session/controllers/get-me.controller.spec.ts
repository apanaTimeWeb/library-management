import { ApiTags } from '@nestjs/swagger';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGetMeController } from '@/modules/auth/session/controllers/auth-get-me.controller';
import { AuthGetMeService } from '@/modules/auth/session/services/auth-get-me.service';

describe('AuthGetMeController', () => {
  let controller: AuthGetMeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthGetMeController],
      providers: [
        {
          provide: AuthGetMeService,
          useValue: {
            getMe: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthGetMeController>(AuthGetMeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
