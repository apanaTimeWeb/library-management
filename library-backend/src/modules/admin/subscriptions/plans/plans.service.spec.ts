import { Test, TestingModule } from '@nestjs/testing';
import { AdminPlansService } from './plans.service';

describe('AdminPlansService', () => {
  let service: AdminPlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminPlansService],
    }).compile();

    service = module.get<AdminPlansService>(AdminPlansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
