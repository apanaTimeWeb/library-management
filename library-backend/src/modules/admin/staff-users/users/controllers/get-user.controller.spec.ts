import { Test, TestingModule } from '@nestjs/testing';
import { GetUserController } from './get-user.controller';
import { GetUserService } from '../services/get-user.service';

describe('GetUserController', () => {
  let controller: GetUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetUserController],
      providers: [
        {
          provide: GetUserService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<GetUserController>(GetUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
