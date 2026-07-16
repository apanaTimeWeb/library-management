import { Test, TestingModule } from '@nestjs/testing';
import { UsersGetAllService } from './users-get-all-users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@/core/entities/user.entity';

describe('GetAllService', () => {
  let service: UsersGetAllService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersGetAllService, {
          provide: getRepositoryToken(User), useValue: {
            findAndCount: jest.fn().mockResolvedValue([[], 0]),
          },
        },
      ],
    }).compile();

    service = module.get<GetAllService>(GetAllService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
