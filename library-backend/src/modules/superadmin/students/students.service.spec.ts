import { Test, TestingModule } from '@nestjs/testing';
import { SuperadminStudentsService } from './students.service';

describe('SuperadminStudentsService', () => {
  let service: SuperadminStudentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperadminStudentsService],
    }).compile();

    service = module.get<SuperadminStudentsService>(SuperadminStudentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
