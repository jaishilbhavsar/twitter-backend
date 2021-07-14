import { JWTService } from './../user/jwt.service';
import { Module } from '@nestjs/common';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';

@Module({
  controllers: [TweetController],
  providers: [TweetService, JWTService]
})
export class TweetModule { }
