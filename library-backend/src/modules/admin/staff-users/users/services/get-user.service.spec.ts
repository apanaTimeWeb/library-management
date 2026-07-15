import { Test, TestingModule } from '@nestjs/testing';
import { GetUserService } from './get-user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@/core/entities/user.entity';

describe('GetUserService', () => {
  let service: GetUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GetUserService>(GetUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
