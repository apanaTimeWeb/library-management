import { Test, TestingModule } from '@nestjs/testing';
import { UpdateTenantController } from './update-tenant.controller';
import { UpdateTenantService } from '../services/update-tenant.service';

describe('UpdateTenantController', () => {
  let controller: UpdateTenantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateTenantController],
      providers: [
        {
          provide: UpdateTenantService,
          useValue: {
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UpdateTenantController>(UpdateTenantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
