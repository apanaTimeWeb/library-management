import { Test, TestingModule } from '@nestjs/testing';
import { UpdateEnquirieService } from './update-enquirie.service';

describe('UpdateEnquirieService', () => {
  let service: UpdateEnquirieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateEnquirieService],
    }).compile();

    service = module.get<UpdateEnquirieService>(UpdateEnquirieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
