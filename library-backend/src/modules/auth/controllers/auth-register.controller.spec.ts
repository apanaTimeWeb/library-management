import { Test, TestingModule } from '@nestjs/testing';
import { AuthRegisterController } from './auth-register.controller';
import { AuthRegisterService } from '../services/auth-register.service';

describe('AuthRegisterController', () => {
  let controller: AuthRegisterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthRegisterController],
      providers: [
        {
          provide: AuthRegisterService,
          useValue: {
            register: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthRegisterController>(AuthRegisterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
