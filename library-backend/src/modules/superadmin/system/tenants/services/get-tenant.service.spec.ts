import { Test, TestingModule } from '@nestjs/testing';
import { GetTenantService } from './get-tenant.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Tenant } from '@/core/entities/tenant.entity';

describe('GetTenantService', () => {
  let service: GetTenantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetTenantService,
        {
          provide: getRepositoryToken(Tenant),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GetTenantService>(GetTenantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
