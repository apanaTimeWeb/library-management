import { Test, TestingModule } from '@nestjs/testing';
import { BranchesAdminService } from './branches.service';

describe('AdminService', () => {
  let service: BranchesAdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BranchesAdminService],
    }).compile();

    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
