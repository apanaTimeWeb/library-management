import { Test, TestingModule } from '@nestjs/testing';
import { AuthLoginService } from './auth-login.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@/core/entities/user.entity';
import { AuthJwtTokenGeneratorUtil } from '../utils/auth-jwt-token-generator.util';

describe('AuthLoginService', () => {
  let service: AuthLoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthLoginService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            createQueryBuilder: jest.fn().mockReturnValue({
              addSelect: jest.fn().mockReturnThis(),
              leftJoinAndSelect: jest.fn().mockReturnThis(),
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

    service = module.get<AuthLoginService>(AuthLoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
