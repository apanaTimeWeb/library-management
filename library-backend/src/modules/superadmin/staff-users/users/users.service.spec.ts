import { Test, TestingModule } from '@nestjs/testing';
import { SuperadminUsersService } from './users.service';

describe('SuperadminUsersService', () => {
  let service: SuperadminUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperadminUsersService],
    }).compile();

    service = module.get<SuperadminUsersService>(SuperadminUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
