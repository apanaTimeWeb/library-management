import { Test, TestingModule } from '@nestjs/testing';
import { ManagerComplaintsService } from './complaints.service';

describe('ManagerComplaintsService', () => {
  let service: ManagerComplaintsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagerComplaintsService],
    }).compile();

    service = module.get<ManagerComplaintsService>(ManagerComplaintsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
