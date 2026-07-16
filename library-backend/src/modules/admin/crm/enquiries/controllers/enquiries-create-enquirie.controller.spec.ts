import { Test, TestingModule } from '@nestjs/testing';
import { EnquiriesCreateEnquirieController } from './create-enquirie.controller';
import { EnquiriesCreateEnquirieService } from '../services/create-enquirie.service';

describe('CreateEnquirieController', () => {
  let controller: EnquiriesCreateEnquirieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnquiriesCreateEnquirieController],
      providers: [Enquiries{ provide: EnquiriesCreateEnquirieService, useValue: { execute: jest.fn() } }, ],
    }).compile();

    controller = module.get<CreateEnquirieController>(CreateEnquirieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
