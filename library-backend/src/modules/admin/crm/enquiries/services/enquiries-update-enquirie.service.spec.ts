import { Test, TestingModule } from '@nestjs/testing';
import { EnquiriesUpdateEnquirieService } from './enquiries-update-enquirie.service';

describe('UpdateEnquirieService', () => {
  let service: EnquiriesUpdateEnquirieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnquiriesUpdateEnquirieService],
    }).compile();

    service = module.get<UpdateEnquirieService>(UpdateEnquirieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
