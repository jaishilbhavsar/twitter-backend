import { Test, TestingModule } from '@nestjs/testing';
import { DirectmessageController } from './directmessage.controller';

describe('DirectmessageController', () => {
  let controller: DirectmessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DirectmessageController],
    }).compile();

    controller = module.get<DirectmessageController>(DirectmessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
