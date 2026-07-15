import { Test, TestingModule } from '@nestjs/testing';
import { CreateStudentController } from './create-student.controller';
import { CreateStudentService } from '../services/create-student.service';

describe('CreateStudentController', () => {
  let controller: CreateStudentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateStudentController],
      providers: [
        {
          provide: CreateStudentService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CreateStudentController>(CreateStudentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
