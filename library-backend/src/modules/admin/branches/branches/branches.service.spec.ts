import { Test, TestingModule } from '@nestjs/testing';
import { AdminBranchesService } from './branches.service';

describe('AdminBranchesService', () => {
  let service: AdminBranchesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminBranchesService],
    }).compile();

    service = module.get<AdminBranchesService>(AdminBranchesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
