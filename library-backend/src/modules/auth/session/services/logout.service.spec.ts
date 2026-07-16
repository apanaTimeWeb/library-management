import { Test, TestingModule } from '@nestjs/testing';
import { AuthLogoutService } from '@/modules/auth/session/services/auth-logout.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@/core/entities/user.entity';

describe('AuthLogoutService', () => {
  let service: AuthLogoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthLogoutService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthLogoutService>(AuthLogoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
