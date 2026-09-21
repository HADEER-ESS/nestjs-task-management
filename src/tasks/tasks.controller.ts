import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { Task } from './task.model.js';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService : TasksService) {}

    @Get()
    getAllTasks() : Task[] {
        return this.tasksService.getAllTasks()
    }

    @Post()
    createNewTask(@Body('title') title: string, @Body('description') description: string): Task{
        return this.tasksService.createNewTask(title, description)
    }
}
