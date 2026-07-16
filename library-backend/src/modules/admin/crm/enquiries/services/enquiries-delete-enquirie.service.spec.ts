import { Test, TestingModule } from '@nestjs/testing';
import { EnquiriesDeleteEnquirieService } from './delete-enquirie.service';

describe('DeleteEnquirieService', () => {
  let service: EnquiriesDeleteEnquirieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnquiriesDeleteEnquirieService],
    }).compile();

    service = module.get<DeleteEnquirieService>(DeleteEnquirieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
