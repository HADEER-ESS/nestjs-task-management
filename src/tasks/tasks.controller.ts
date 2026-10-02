import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { TaskStatus } from './task-status.enum.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { GetTaskFilterDto } from './dto/get-task-filter.dto.js';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto.js';
import { Task } from './task.entity.js';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService : TasksService) {}

    @Get()
    getTasks(@Query() filter: GetTaskFilterDto) : Promise<Task[]> {
        return this.tasksService.getTasks(filter)
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<Task>{
        return this.tasksService.getTaskByID(id)
    }

    @Post()
    createNewTask(@Body() body: CreateTaskDto): Promise<Task>{
        return this.tasksService.createNewTask(body)
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id:string): Promise<void>{
        return this.tasksService.deleteTaskById(id)
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id:string,
        @Body() updateTaskStatusDto: UpdateTaskStatusDto
    ): Promise<Task> {
        const { status } = updateTaskStatusDto
        return this.tasksService.updateTaskStatus(id, status)
    }
}
