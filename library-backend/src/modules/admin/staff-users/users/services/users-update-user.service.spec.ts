import { Test, TestingModule } from '@nestjs/testing';
import { UsersUpdateUserService } from './update-user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@/core/entities/user.entity';

describe('UpdateUserService', () => {
  let service: UsersUpdateUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersUpdateUserService, {
          provide: getRepositoryToken(User), useValue: {
            findOne: jest.fn(), save: jest.fn(), }, }, ],
    }).compile();

    service = module.get<UpdateUserService>(UpdateUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
