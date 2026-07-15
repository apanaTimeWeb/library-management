import { Test, TestingModule } from '@nestjs/testing';
import { GetMeController } from './get-me.controller';
import { GetMeService } from '../services/get-me.service';

describe('GetMeController', () => {
  let controller: GetMeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetMeController],
      providers: [
        {
          provide: GetMeService,
          useValue: {
            getMe: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<GetMeController>(GetMeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
