import { Test, TestingModule } from '@nestjs/testing';
import { CreateTenantController } from './create-tenant.controller';
import { CreateTenantService } from '../services/create-tenant.service';

describe('CreateTenantController', () => {
  let controller: CreateTenantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateTenantController],
      providers: [
        {
          provide: CreateTenantService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CreateTenantController>(CreateTenantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
