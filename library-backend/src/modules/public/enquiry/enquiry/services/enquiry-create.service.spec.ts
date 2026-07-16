import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EnquiryCreateService } from './enquiry-create.service';
import { Enquiry } from '@/core/entities/enquiry.entity';

describe('EnquiryCreateService', () => {
  let service: EnquiryCreateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnquiryCreateService,
        {
          provide: getRepositoryToken(Enquiry),
          useValue: { create: jest.fn(), save: jest.fn() },
        }
      ],
    }).compile();

    service = module.get<EnquiryCreateService>(EnquiryCreateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
