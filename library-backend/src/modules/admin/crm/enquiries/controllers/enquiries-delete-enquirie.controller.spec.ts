import { Test, TestingModule } from '@nestjs/testing';
import { EnquiriesDeleteEnquirieController } from './delete-enquirie.controller';
import { EnquiriesDeleteEnquirieService } from '../services/delete-enquirie.service';

describe('DeleteEnquirieController', () => {
  let controller: EnquiriesDeleteEnquirieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnquiriesDeleteEnquirieController],
      providers: [Enquiries{ provide: EnquiriesDeleteEnquirieService, useValue: { execute: jest.fn() } }, ],
    }).compile();

    controller = module.get<DeleteEnquirieController>(DeleteEnquirieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
