import { Test, TestingModule } from '@nestjs/testing';
import { CreateEnquiryService } from './create-enquiry.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Enquiry } from '@/core/entities/enquiry.entity';

describe('CreateEnquiryService', () => {
  let service: CreateEnquiryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateEnquiryService,
        {
          provide: getRepositoryToken(Enquiry),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CreateEnquiryService>(CreateEnquiryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
