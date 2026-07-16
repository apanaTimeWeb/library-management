import { Test, TestingModule } from '@nestjs/testing';
import { UsersUpdateUserController } from './update-user.controller';
import { UsersUpdateUserService } from '../services/update-user.service';

describe('UpdateUserController', () => {
  let controller: UsersUpdateUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersUpdateUserController],
      providers: [Users{
          provide: UsersUpdateUserService, useValue: {
            update: jest.fn(), }, }, ],
    }).compile();

    controller = module.get<UpdateUserController>(UpdateUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
