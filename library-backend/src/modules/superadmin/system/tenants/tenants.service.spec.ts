import { Test, TestingModule } from '@nestjs/testing';
import { SuperadminTenantsService } from './tenants.service';

describe('SuperadminTenantsService', () => {
  let service: SuperadminTenantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperadminTenantsService],
    }).compile();

    service = module.get<SuperadminTenantsService>(SuperadminTenantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
