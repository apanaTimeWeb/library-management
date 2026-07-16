import { Test, TestingModule } from '@nestjs/testing';
import { AuthForgotPasswordService } from './auth-forgot-password.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@/core/entities/user.entity';

describe('AuthForgotPasswordService', () => {
  let service: AuthForgotPasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthForgotPasswordService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthForgotPasswordService>(AuthForgotPasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
