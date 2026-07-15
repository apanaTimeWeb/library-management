import { Test, TestingModule } from '@nestjs/testing';
import { DeleteTenantController } from './delete-tenant.controller';
import { DeleteTenantService } from '../services/delete-tenant.service';

describe('DeleteTenantController', () => {
  let controller: DeleteTenantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteTenantController],
      providers: [
        {
          provide: DeleteTenantService,
          useValue: {
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DeleteTenantController>(DeleteTenantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
