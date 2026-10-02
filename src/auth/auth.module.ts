import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
