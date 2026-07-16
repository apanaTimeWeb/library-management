import { Test, TestingModule } from '@nestjs/testing';
import { UsersGetUserController } from './users-get-user.controller';
import { UsersGetUserService } from '../services/users-get-user.service';

describe('GetUserController', () => {
  let controller: UsersGetUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersGetUserController],
      providers: [Users{
          provide: UsersGetUserService, useValue: {
            findOne: jest.fn(), }, }, ],
    }).compile();

    controller = module.get<GetUserController>(GetUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
