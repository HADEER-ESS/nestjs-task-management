import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller.js';
import { TasksService } from './tasks.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository])
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
