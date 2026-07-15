import { Test, TestingModule } from '@nestjs/testing';
import { ForgotPasswordService } from './forgot-password.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@/core/entities/user.entity';

describe('ForgotPasswordService', () => {
  let service: ForgotPasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ForgotPasswordService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ForgotPasswordService>(ForgotPasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
