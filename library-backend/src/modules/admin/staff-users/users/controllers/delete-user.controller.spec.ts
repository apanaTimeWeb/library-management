import { Test, TestingModule } from '@nestjs/testing';
import { DeleteUserController } from './delete-user.controller';
import { DeleteUserService } from '../services/delete-user.service';

describe('DeleteUserController', () => {
  let controller: DeleteUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteUserController],
      providers: [
        {
          provide: DeleteUserService,
          useValue: {
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DeleteUserController>(DeleteUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
