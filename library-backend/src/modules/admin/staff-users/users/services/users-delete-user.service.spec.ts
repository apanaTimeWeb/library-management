import { Test, TestingModule } from '@nestjs/testing';
import { UsersDeleteUserService } from './users-delete-user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@/core/entities/user.entity';

describe('DeleteUserService', () => {
  let service: UsersDeleteUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersDeleteUserService, {
          provide: getRepositoryToken(User), useValue: {
            findOne: jest.fn(), softRemove: jest.fn(), }, }, ],
    }).compile();

    service = module.get<DeleteUserService>(DeleteUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
