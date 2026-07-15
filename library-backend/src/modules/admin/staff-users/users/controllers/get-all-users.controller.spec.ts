import { Test, TestingModule } from '@nestjs/testing';
import { GetAllUsersController } from './get-all-users.controller';
import { GetAllUsersService } from '../services/get-all-users.service';

describe('GetAllUsersController', () => {
  let controller: GetAllUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetAllUsersController],
      providers: [
        {
          provide: GetAllUsersService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<GetAllUsersController>(GetAllUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
