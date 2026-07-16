import { Test, TestingModule } from '@nestjs/testing';
import { EnquiriesUpdateEnquirieController } from './update-enquirie.controller';
import { EnquiriesUpdateEnquirieService } from '../services/update-enquirie.service';

describe('UpdateEnquirieController', () => {
  let controller: EnquiriesUpdateEnquirieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnquiriesUpdateEnquirieController],
      providers: [Enquiries{ provide: EnquiriesUpdateEnquirieService, useValue: { execute: jest.fn() } }, ],
    }).compile();

    controller = module.get<UpdateEnquirieController>(UpdateEnquirieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
