import { Test, TestingModule } from '@nestjs/testing';
import { DeleteTenantService } from './delete-tenant.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Tenant } from '@/core/entities/tenant.entity';

describe('DeleteTenantService', () => {
  let service: DeleteTenantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteTenantService,
        {
          provide: getRepositoryToken(Tenant),
          useValue: {
            findOne: jest.fn(),
            softRemove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DeleteTenantService>(DeleteTenantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
