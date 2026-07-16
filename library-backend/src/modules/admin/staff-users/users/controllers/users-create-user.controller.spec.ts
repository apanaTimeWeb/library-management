import { Test, TestingModule } from '@nestjs/testing';
import { UsersCreateUserController } from './create-user.controller';
import { UsersCreateUserService } from '../services/create-user.service';

describe('CreateUserController', () => {
  let controller: UsersCreateUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersCreateUserController],
      providers: [Users{
          provide: UsersCreateUserService, useValue: {
            create: jest.fn(), }, }, ],
    }).compile();

    controller = module.get<CreateUserController>(CreateUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
