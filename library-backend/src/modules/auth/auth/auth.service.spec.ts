import { Test, TestingModule } from '@nestjs/testing';
import { AuthAuthService } from './auth.service';

describe('AuthAuthService', () => {
  let service: AuthAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthAuthService],
    }).compile();

    service = module.get<AuthAuthService>(AuthAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
