import { Test, TestingModule } from '@nestjs/testing';
import { CreateEnquiryController } from './create-enquiry.controller';
import { CreateEnquiryService } from '../services/create-enquiry.service';

describe('CreateEnquiryController', () => {
  let controller: CreateEnquiryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateEnquiryController],
      providers: [
        {
          provide: CreateEnquiryService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CreateEnquiryController>(CreateEnquiryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
