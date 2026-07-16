import { Test, TestingModule } from '@nestjs/testing';
import { EnquiriesGetEnquirieService } from './enquiries-get-enquirie.service';

describe('GetEnquirieService', () => {
  let service: EnquiriesGetEnquirieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnquiriesGetEnquirieService],
    }).compile();

    service = module.get<GetEnquirieService>(GetEnquirieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
