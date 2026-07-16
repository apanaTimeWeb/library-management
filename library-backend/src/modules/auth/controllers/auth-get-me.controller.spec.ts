import { Test, TestingModule } from '@nestjs/testing';
import { AuthGetMeController } from './auth-get-me.controller';
import { AuthGetMeService } from '../services/auth-get-me.service';

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
