import { Test, TestingModule } from '@nestjs/testing';
import { AuthResetPasswordService } from '@/modules/auth/reset-password/services/auth-reset-password.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@/core/entities/user.entity';

describe('AuthResetPasswordService', () => {
  let service: AuthResetPasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResetPasswordService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthResetPasswordService>(AuthResetPasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
