import { Test, TestingModule } from '@nestjs/testing';
import { DeleteEnquirieController } from './delete-enquirie.controller';
import { DeleteEnquirieService } from '../services/delete-enquirie.service';

describe('DeleteEnquirieController', () => {
  let controller: DeleteEnquirieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteEnquirieController],
      providers: [
        { provide: DeleteEnquirieService, useValue: { execute: jest.fn() } }
      ]
    }).compile();

    controller = module.get<DeleteEnquirieController>(DeleteEnquirieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
