import { Test, TestingModule } from '@nestjs/testing';
import { GetAllTenantsController } from './get-all-tenants.controller';
import { GetAllTenantsService } from '../services/get-all-tenants.service';

describe('GetAllTenantsController', () => {
  let controller: GetAllTenantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetAllTenantsController],
      providers: [
        {
          provide: GetAllTenantsService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<GetAllTenantsController>(GetAllTenantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
