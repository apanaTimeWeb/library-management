import { Test, TestingModule } from '@nestjs/testing';
import { RefreshTokenController } from './refresh-token.controller';
import { RefreshTokenService } from '../services/refresh-token.service';

describe('RefreshTokenController', () => {
  let controller: RefreshTokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RefreshTokenController],
      providers: [
        {
          provide: RefreshTokenService,
          useValue: {
            refresh: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RefreshTokenController>(RefreshTokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
