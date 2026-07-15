import { Test, TestingModule } from '@nestjs/testing';
import { SuperadminBranchesService } from './branches.service';

describe('SuperadminBranchesService', () => {
  let service: SuperadminBranchesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperadminBranchesService],
    }).compile();

    service = module.get<SuperadminBranchesService>(SuperadminBranchesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
