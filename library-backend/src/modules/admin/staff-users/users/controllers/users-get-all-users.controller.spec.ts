import { Test, TestingModule } from '@nestjs/testing';
import { UsersGetAllController } from './get-all-users.controller';
import { UsersGetAllService } from '../services/get-all-users.service';

describe('GetAllController', () => {
  let controller: UsersGetAllController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersGetAllController],
      providers: [Users{
          provide: UsersGetAllService, useValue: {
            findAll: jest.fn(), }, }, ],
    }).compile();

    controller = module.get<GetAllController>(GetAllController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
