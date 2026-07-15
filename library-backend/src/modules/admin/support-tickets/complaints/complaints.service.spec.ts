import { Test, TestingModule } from '@nestjs/testing';
import { AdminComplaintsService } from './complaints.service';

describe('AdminComplaintsService', () => {
  let service: AdminComplaintsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminComplaintsService],
    }).compile();

    service = module.get<AdminComplaintsService>(AdminComplaintsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
