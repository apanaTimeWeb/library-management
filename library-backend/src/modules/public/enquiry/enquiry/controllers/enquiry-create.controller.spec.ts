import { Test, TestingModule } from '@nestjs/testing';
import { EnquiryCreateController } from './enquiry-create.controller';
import { EnquiryCreateService } from '../services/enquiry-create.service';

describe('EnquiryCreateController', () => {
  let controller: EnquiryCreateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnquiryCreateController],
      providers: [
        {
          provide: EnquiryCreateService,
          useValue: { create: jest.fn() },
        }
      ],
    }).compile();

    controller = module.get<EnquiryCreateController>(EnquiryCreateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
