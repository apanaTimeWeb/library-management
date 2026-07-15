import { Test, TestingModule } from '@nestjs/testing';
import { SuperadminPermissionsService } from './permissions.service';

describe('SuperadminPermissionsService', () => {
  let service: SuperadminPermissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperadminPermissionsService],
    }).compile();

    service = module.get<SuperadminPermissionsService>(
      SuperadminPermissionsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
