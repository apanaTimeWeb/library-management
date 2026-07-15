import { Test, TestingModule } from '@nestjs/testing';
import { UpdateStudentController } from './update-student.controller';
import { UpdateStudentService } from '../services/update-student.service';

describe('UpdateStudentController', () => {
  let controller: UpdateStudentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateStudentController],
      providers: [
        {
          provide: UpdateStudentService,
          useValue: {
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UpdateStudentController>(UpdateStudentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
