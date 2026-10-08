import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { GetTaskFilterDto } from './dto/get-task-filter.dto.js';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto.js';
import { Task } from './task.entity.js';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator.js';
import { User } from '../auth/user.entity.js';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private readonly tasksService : TasksService) {}

    @Get()
    getTasks(@Query() filter: GetTaskFilterDto, @GetUser() user: User) : Promise<Task[]> {
        return this.tasksService.getTasks(filter, user)
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task>{
        return this.tasksService.getTaskByID(id, user)
    }

    @Post()
    createNewTask(
        @Body() body: CreateTaskDto,
        @GetUser() user: User
    ): Promise<Task>{
        return this.tasksService.createNewTask(body, user)
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id:string, @GetUser() user: User): Promise<void>{
        return this.tasksService.deleteTaskById(id, user)
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id:string,
        @Body() updateTaskStatusDto: UpdateTaskStatusDto,
        @GetUser() user: User
    ): Promise<Task> {
        const { status } = updateTaskStatusDto
        return this.tasksService.updateTaskStatus(id, status, user)
    }
}
