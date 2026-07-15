import { Test, TestingModule } from '@nestjs/testing';
import { GetTenantController } from './get-tenant.controller';
import { GetTenantService } from '../services/get-tenant.service';

describe('GetTenantController', () => {
  let controller: GetTenantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetTenantController],
      providers: [
        {
          provide: GetTenantService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<GetTenantController>(GetTenantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
