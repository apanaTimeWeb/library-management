import { Test, TestingModule } from '@nestjs/testing';
import { GetAllEnquiriesController } from './get-all-enquiries.controller';
import { GetAllEnquiriesService } from '../services/get-all-enquiries.service';

describe('GetAllEnquiriesController', () => {
  let controller: GetAllEnquiriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetAllEnquiriesController],
      providers: [
        { provide: GetAllEnquiriesService, useValue: { execute: jest.fn() } }
      ]
    }).compile();

    controller = module.get<GetAllEnquiriesController>(GetAllEnquiriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
