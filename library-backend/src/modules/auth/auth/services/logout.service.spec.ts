import { Test, TestingModule } from '@nestjs/testing';
import { LogoutService } from './logout.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@/core/entities/user.entity';

describe('LogoutService', () => {
  let service: LogoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogoutService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LogoutService>(LogoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
