import { Test, TestingModule } from '@nestjs/testing';
import { StudentsGetAllController } from './get-all-students.controller';
import { StudentsGetAllService } from '../services/get-all-students.service';

describe('GetAllController', () => {
  let controller: StudentsGetAllController;
  let service: StudentsGetAllService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsGetAllController],
      providers: [Students{
          provide: StudentsGetAllService, useValue: {
            findAll: jest.fn(), }, }, ],
    }).compile();

    controller = module.get<GetAllController>(GetAllController);
    service = module.get<GetAllService>(GetAllService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
