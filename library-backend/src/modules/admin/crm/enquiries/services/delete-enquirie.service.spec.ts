import { Test, TestingModule } from '@nestjs/testing';
import { DeleteEnquirieService } from './delete-enquirie.service';

describe('DeleteEnquirieService', () => {
  let service: DeleteEnquirieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteEnquirieService],
    }).compile();

    service = module.get<DeleteEnquirieService>(DeleteEnquirieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
