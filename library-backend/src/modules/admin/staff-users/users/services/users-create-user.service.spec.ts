import { Test, TestingModule } from '@nestjs/testing';
import { UsersCreateUserService } from './create-user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@/core/entities/user.entity';

describe('CreateUserService', () => {
  let service: UsersCreateUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersCreateUserService, {
          provide: getRepositoryToken(User), useValue: {
            create: jest.fn(), save: jest.fn(), }, }, ],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
