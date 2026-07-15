import { Test, TestingModule } from '@nestjs/testing';
import { ManagerStudentsService } from './students.service';

describe('ManagerStudentsService', () => {
  let service: ManagerStudentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagerStudentsService],
    }).compile();

    service = module.get<ManagerStudentsService>(ManagerStudentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
