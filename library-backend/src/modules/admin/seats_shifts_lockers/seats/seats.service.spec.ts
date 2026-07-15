import { Test, TestingModule } from '@nestjs/testing';
import { AdminSeatsService } from './seats.service';

describe('AdminSeatsService', () => {
  let service: AdminSeatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminSeatsService],
    }).compile();

    service = module.get<AdminSeatsService>(AdminSeatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
