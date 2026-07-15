import { Test, TestingModule } from '@nestjs/testing';
import { SuperadminRolesService } from './roles.service';

describe('SuperadminRolesService', () => {
  let service: SuperadminRolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperadminRolesService],
    }).compile();

    service = module.get<SuperadminRolesService>(SuperadminRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
