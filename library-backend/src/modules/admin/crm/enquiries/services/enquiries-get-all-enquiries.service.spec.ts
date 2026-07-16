import { Test, TestingModule } from '@nestjs/testing';
import { EnquiriesGetAllService } from './get-all-enquiries.service';

describe('GetAllService', () => {
  let service: EnquiriesGetAllService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnquiriesGetAllService],
    }).compile();

    service = module.get<GetAllService>(GetAllService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
