import { Test, TestingModule } from '@nestjs/testing';
import { UsersDeleteUserController } from './delete-user.controller';
import { UsersDeleteUserService } from '../services/delete-user.service';

describe('DeleteUserController', () => {
  let controller: UsersDeleteUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersDeleteUserController],
      providers: [Users{
          provide: UsersDeleteUserService, useValue: {
            delete: jest.fn(), }, }, ],
    }).compile();

    controller = module.get<DeleteUserController>(DeleteUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
