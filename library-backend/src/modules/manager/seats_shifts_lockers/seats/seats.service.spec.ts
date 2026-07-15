import { Test, TestingModule } from '@nestjs/testing';
import { ManagerSeatsService } from './seats.service';

describe('ManagerSeatsService', () => {
  let service: ManagerSeatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagerSeatsService],
    }).compile();

    service = module.get<ManagerSeatsService>(ManagerSeatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
