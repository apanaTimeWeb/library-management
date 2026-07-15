import { Test, TestingModule } from '@nestjs/testing';
import { CreateTenantService } from './create-tenant.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Tenant } from '@/core/entities/tenant.entity';

describe('CreateTenantService', () => {
  let service: CreateTenantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTenantService,
        {
          provide: getRepositoryToken(Tenant),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CreateTenantService>(CreateTenantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
