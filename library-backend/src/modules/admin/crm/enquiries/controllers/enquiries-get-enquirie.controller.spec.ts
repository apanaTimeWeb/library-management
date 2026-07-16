import { Test, TestingModule } from '@nestjs/testing';
import { EnquiriesGetEnquirieController } from './enquiries-get-enquirie.controller';
import { EnquiriesGetEnquirieService } from '../services/enquiries-get-enquirie.service';

describe('GetEnquirieController', () => {
  let controller: EnquiriesGetEnquirieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnquiriesGetEnquirieController],
      providers: [Enquiries{ provide: EnquiriesGetEnquirieService, useValue: { execute: jest.fn() } }, ],
    }).compile();

    controller = module.get<GetEnquirieController>(GetEnquirieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
