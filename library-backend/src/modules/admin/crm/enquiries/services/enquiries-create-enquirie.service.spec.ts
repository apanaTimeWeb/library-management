import { Test, TestingModule } from '@nestjs/testing';
import { EnquiriesCreateEnquirieService } from './create-enquirie.service';

describe('CreateEnquirieService', () => {
  let service: EnquiriesCreateEnquirieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnquiriesCreateEnquirieService],
    }).compile();

    service = module.get<CreateEnquirieService>(CreateEnquirieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
