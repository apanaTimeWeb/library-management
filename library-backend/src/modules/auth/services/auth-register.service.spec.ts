import { Test, TestingModule } from '@nestjs/testing';
import { AuthRegisterService } from './auth-register.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@/core/entities/user.entity';
import { Role } from '@/core/entities/role.entity';

describe('AuthRegisterService', () => {
  let service: AuthRegisterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthRegisterService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Role),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthRegisterService>(AuthRegisterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
