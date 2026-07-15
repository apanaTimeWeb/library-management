import { Test, TestingModule } from '@nestjs/testing';
import { GetAllTenantsService } from './get-all-tenants.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Tenant } from '@/core/entities/tenant.entity';

describe('GetAllTenantsService', () => {
  let service: GetAllTenantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllTenantsService,
        {
          provide: getRepositoryToken(Tenant),
          useValue: {
            findAndCount: jest.fn().mockResolvedValue([[], 0]),
          },
        },
      ],
    }).compile();

    service = module.get<GetAllTenantsService>(GetAllTenantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
