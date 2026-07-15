import { Test, TestingModule } from '@nestjs/testing';
import { GetMeService } from './get-me.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@/core/entities/user.entity';

describe('GetMeService', () => {
  let service: GetMeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetMeService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GetMeService>(GetMeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
