import { Test, TestingModule } from '@nestjs/testing';
import { LogoutController } from './logout.controller';
import { LogoutService } from '../services/logout.service';

describe('LogoutController', () => {
  let controller: LogoutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogoutController],
      providers: [
        {
          provide: LogoutService,
          useValue: {
            logout: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<LogoutController>(LogoutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
