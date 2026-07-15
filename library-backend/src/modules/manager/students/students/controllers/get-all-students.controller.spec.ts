import { Test, TestingModule } from '@nestjs/testing';
import { GetAllStudentsController } from './get-all-students.controller';
import { GetAllStudentsService } from '../services/get-all-students.service';

describe('GetAllStudentsController', () => {
  let controller: GetAllStudentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetAllStudentsController],
      providers: [
        {
          provide: GetAllStudentsService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<GetAllStudentsController>(GetAllStudentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
