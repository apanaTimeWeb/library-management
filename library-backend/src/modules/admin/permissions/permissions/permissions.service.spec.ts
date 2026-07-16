import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsAdminService } from './permissions.service';

describe('AdminService', () => {
  let service: PermissionsAdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionsAdminService],
    }).compile();

    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
