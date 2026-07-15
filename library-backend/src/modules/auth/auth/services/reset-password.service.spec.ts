import { Test, TestingModule } from '@nestjs/testing';
import { ResetPasswordService } from './reset-password.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@/core/entities/user.entity';

describe('ResetPasswordService', () => {
  let service: ResetPasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResetPasswordService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ResetPasswordService>(ResetPasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
