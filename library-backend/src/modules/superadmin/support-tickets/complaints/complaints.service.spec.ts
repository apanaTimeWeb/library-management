import { Test, TestingModule } from '@nestjs/testing';
import { SuperadminComplaintsService } from './complaints.service';

describe('SuperadminComplaintsService', () => {
  let service: SuperadminComplaintsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperadminComplaintsService],
    }).compile();

    service = module.get<SuperadminComplaintsService>(SuperadminComplaintsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
