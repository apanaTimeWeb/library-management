import { Test, TestingModule } from '@nestjs/testing';
import { RolesAdminService } from './roles.service';

describe('AdminService', () => {
  let service: RolesAdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesAdminService],
    }).compile();

    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
