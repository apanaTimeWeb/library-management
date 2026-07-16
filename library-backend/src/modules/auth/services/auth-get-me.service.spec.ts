import { Test, TestingModule } from '@nestjs/testing';
import { AuthGetMeService } from './auth-get-me.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@/core/entities/user.entity';

describe('AuthGetMeService', () => {
  let service: AuthGetMeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGetMeService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthGetMeService>(AuthGetMeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
