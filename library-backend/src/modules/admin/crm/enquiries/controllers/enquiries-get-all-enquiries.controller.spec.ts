import { Test, TestingModule } from '@nestjs/testing';
import { EnquiriesGetAllController } from './get-all-enquiries.controller';
import { EnquiriesGetAllService } from '../services/get-all-enquiries.service';

describe('GetAllController', () => {
  let controller: EnquiriesGetAllController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnquiriesGetAllController],
      providers: [Enquiries{ provide: EnquiriesGetAllService, useValue: { execute: jest.fn() } }, ],
    }).compile();

    controller = module.get<GetAllController>(
      GetAllController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
