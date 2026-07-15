import { Test, TestingModule } from '@nestjs/testing';
import { CreateEnquirieService } from './create-enquirie.service';

describe('CreateEnquirieService', () => {
  let service: CreateEnquirieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateEnquirieService],
    }).compile();

    service = module.get<CreateEnquirieService>(CreateEnquirieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
