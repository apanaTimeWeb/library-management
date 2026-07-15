import { Test, TestingModule } from '@nestjs/testing';
import { GetAllUsersService } from './get-all-users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@/core/entities/user.entity';

describe('GetAllUsersService', () => {
  let service: GetAllUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllUsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findAndCount: jest.fn().mockResolvedValue([[], 0]),
          },
        },
      ],
    }).compile();

    service = module.get<GetAllUsersService>(GetAllUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
