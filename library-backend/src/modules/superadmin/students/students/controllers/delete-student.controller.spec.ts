import { Test, TestingModule } from '@nestjs/testing';
import { DeleteStudentController } from './delete-student.controller';
import { DeleteStudentService } from '../services/delete-student.service';

describe('DeleteStudentController', () => {
  let controller: DeleteStudentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteStudentController],
      providers: [
        {
          provide: DeleteStudentService,
          useValue: {
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DeleteStudentController>(DeleteStudentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
