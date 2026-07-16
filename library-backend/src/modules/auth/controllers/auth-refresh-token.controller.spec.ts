import { Test, TestingModule } from '@nestjs/testing';
import { AuthRefreshTokenController } from './auth-refresh-token.controller';
import { AuthRefreshTokenService } from '../services/auth-refresh-token.service';

describe('AuthRefreshTokenController', () => {
  let controller: AuthRefreshTokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthRefreshTokenController],
      providers: [
        {
          provide: AuthRefreshTokenService,
          useValue: {
            refresh: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthRefreshTokenController>(AuthRefreshTokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
