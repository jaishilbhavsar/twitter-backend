import { TweetModule } from './tweet/tweet.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DirectmessageModule } from './directmessage/directmessage.module';

@Module({
  imports: [DatabaseModule, UserModule, TweetModule, DirectmessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
