import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@/core/entities/user.entity';
import { JwtTokenGeneratorUtil } from '../utils/jwt-token-generator.util';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
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
          provide: JwtTokenGeneratorUtil,
          useValue: {
            generateTokens: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
