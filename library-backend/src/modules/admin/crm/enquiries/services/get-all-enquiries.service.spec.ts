import { Test, TestingModule } from '@nestjs/testing';
import { GetAllEnquiriesService } from './get-all-enquiries.service';

describe('GetAllEnquiriesService', () => {
  let service: GetAllEnquiriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAllEnquiriesService],
    }).compile();

    service = module.get<GetAllEnquiriesService>(GetAllEnquiriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
