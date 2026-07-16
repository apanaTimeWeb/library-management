import { ApiTags } from '@nestjs/swagger';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthRefreshTokenController } from '@/modules/auth/session/controllers/auth-refresh-token.controller';
import { AuthRefreshTokenService } from '@/modules/auth/session/services/auth-refresh-token.service';

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
