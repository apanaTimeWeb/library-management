import { Test, TestingModule } from '@nestjs/testing';
import { SuperadminSeatsService } from './seats.service';

describe('SuperadminSeatsService', () => {
  let service: SuperadminSeatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperadminSeatsService],
    }).compile();

    service = module.get<SuperadminSeatsService>(SuperadminSeatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
