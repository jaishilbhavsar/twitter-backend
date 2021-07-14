import { JWTService } from './jwt.service';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, JWTService]
})
export class UserModule { }
