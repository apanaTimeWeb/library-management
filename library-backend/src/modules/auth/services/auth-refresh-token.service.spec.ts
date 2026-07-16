import { Test, TestingModule } from '@nestjs/testing';
import { AuthRefreshTokenService } from './auth-refresh-token.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@/core/entities/user.entity';
import { AuthJwtTokenGeneratorUtil } from '../utils/auth-jwt-token-generator.util';

describe('AuthRefreshTokenService', () => {
  let service: AuthRefreshTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthRefreshTokenService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            createQueryBuilder: jest.fn().mockReturnValue({
              addSelect: jest.fn().mockReturnThis(),
              where: jest.fn().mockReturnThis(),
              getOne: jest.fn(),
            }),
            update: jest.fn(),
          },
        },
        {
          provide: AuthJwtTokenGeneratorUtil,
          useValue: {
            generateTokens: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthRefreshTokenService>(AuthRefreshTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
