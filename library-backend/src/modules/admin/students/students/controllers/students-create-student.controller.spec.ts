import { Test, TestingModule } from '@nestjs/testing';
import { StudentsCreateStudentController } from './create-student.controller';
import { StudentsCreateStudentService } from '../services/create-student.service';

describe('CreateStudentController', () => {
  let controller: StudentsCreateStudentController;
  let service: StudentsCreateStudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsCreateStudentController],
      providers: [Students{
          provide: StudentsCreateStudentService, useValue: {
            create: jest.fn(), }, }, ],
    }).compile();

    controller = module.get<CreateStudentController>(CreateStudentController);
    service = module.get<CreateStudentService>(CreateStudentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
