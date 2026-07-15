import { Test, TestingModule } from '@nestjs/testing';
import { GetStudentController } from './get-student.controller';
import { GetStudentService } from '../services/get-student.service';

describe('GetStudentController', () => {
  let controller: GetStudentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetStudentController],
      providers: [
        {
          provide: GetStudentService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<GetStudentController>(GetStudentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
