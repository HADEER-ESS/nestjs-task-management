import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { Task } from './task.model.js';
import { CreateTaskDto } from './dto/create-task.dto.js';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService : TasksService) {}

    @Get()
    getAllTasks() : Task[] {
        return this.tasksService.getAllTasks()
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task | null{
        return this.tasksService.getTaskByID(id)
    }

    @Post()
    createNewTask(@Body() body: CreateTaskDto): Task{
        return this.tasksService.createNewTask(body)
    }
}
