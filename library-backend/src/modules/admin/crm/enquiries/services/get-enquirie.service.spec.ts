import { Test, TestingModule } from '@nestjs/testing';
import { GetEnquirieService } from './get-enquirie.service';

describe('GetEnquirieService', () => {
  let service: GetEnquirieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetEnquirieService],
    }).compile();

    service = module.get<GetEnquirieService>(GetEnquirieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
