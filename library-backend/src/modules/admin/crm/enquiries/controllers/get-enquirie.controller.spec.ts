import { Test, TestingModule } from '@nestjs/testing';
import { GetEnquirieController } from './get-enquirie.controller';
import { GetEnquirieService } from '../services/get-enquirie.service';

describe('GetEnquirieController', () => {
  let controller: GetEnquirieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetEnquirieController],
      providers: [
        { provide: GetEnquirieService, useValue: { execute: jest.fn() } }
      ]
    }).compile();

    controller = module.get<GetEnquirieController>(GetEnquirieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
