import { Test, TestingModule } from '@nestjs/testing';
import { StudentsUpdateStudentController } from './update-student.controller';
import { StudentsUpdateStudentService } from '../services/update-student.service';

describe('UpdateStudentController', () => {
  let controller: StudentsUpdateStudentController;
  let service: StudentsUpdateStudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsUpdateStudentController],
      providers: [Students{
          provide: StudentsUpdateStudentService, useValue: {
            update: jest.fn(), }, }, ],
    }).compile();

    controller = module.get<UpdateStudentController>(UpdateStudentController);
    service = module.get<UpdateStudentService>(UpdateStudentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
