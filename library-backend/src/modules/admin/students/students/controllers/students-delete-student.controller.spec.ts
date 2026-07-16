import { Test, TestingModule } from '@nestjs/testing';
import { StudentsDeleteStudentController } from './delete-student.controller';
import { StudentsDeleteStudentService } from '../services/delete-student.service';

describe('DeleteStudentController', () => {
  let controller: StudentsDeleteStudentController;
  let service: StudentsDeleteStudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsDeleteStudentController],
      providers: [Students{
          provide: StudentsDeleteStudentService, useValue: {
            delete: jest.fn(), }, }, ],
    }).compile();

    controller = module.get<DeleteStudentController>(DeleteStudentController);
    service = module.get<DeleteStudentService>(DeleteStudentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
