import { Test, TestingModule } from '@nestjs/testing';
import { UpdateEnquirieController } from './update-enquirie.controller';
import { UpdateEnquirieService } from '../services/update-enquirie.service';

describe('UpdateEnquirieController', () => {
  let controller: UpdateEnquirieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateEnquirieController],
      providers: [
        { provide: UpdateEnquirieService, useValue: { execute: jest.fn() } },
      ],
    }).compile();

    controller = module.get<UpdateEnquirieController>(UpdateEnquirieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
