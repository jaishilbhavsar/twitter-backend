import { JWTService } from './../user/jwt.service';
import { Module } from '@nestjs/common';
import { DirectmessageController } from './directmessage.controller';
import { DirectmessageService } from './directmessage.service';

@Module({
  controllers: [DirectmessageController],
  providers: [DirectmessageService, JWTService]
})
export class DirectmessageModule { }
