import { Test, TestingModule } from '@nestjs/testing';
import { CreateEnquirieController } from './create-enquirie.controller';
import { CreateEnquirieService } from '../services/create-enquirie.service';

describe('CreateEnquirieController', () => {
  let controller: CreateEnquirieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateEnquirieController],
      providers: [
        { provide: CreateEnquirieService, useValue: { execute: jest.fn() } },
      ],
    }).compile();

    controller = module.get<CreateEnquirieController>(CreateEnquirieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
