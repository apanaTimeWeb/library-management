import { Test, TestingModule } from '@nestjs/testing';
import { UpdateTenantService } from './update-tenant.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Tenant } from '@/core/entities/tenant.entity';

describe('UpdateTenantService', () => {
  let service: UpdateTenantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateTenantService,
        {
          provide: getRepositoryToken(Tenant),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UpdateTenantService>(UpdateTenantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
