import { Test, TestingModule } from '@nestjs/testing';
import { SuperadminPlansService } from './plans.service';

describe('SuperadminPlansService', () => {
  let service: SuperadminPlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperadminPlansService],
    }).compile();

    service = module.get<SuperadminPlansService>(SuperadminPlansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
