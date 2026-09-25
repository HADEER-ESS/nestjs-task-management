import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { Task, TaskStatus } from './task.model.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { GetTaskFilterDto } from './dto/get-task-filter.dto.js';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto.js';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService : TasksService) {}

    @Get()
    getTasks(@Query() filter: GetTaskFilterDto) : Task[] {
        //condition if user enter any search query
        if(Object.keys(filter).length){
            // run filter function
            return this.tasksService.searchTasks(filter)
        }
        //otherwise return all tasks
        else{
             return this.tasksService.getAllTasks()
        }
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task{
        return this.tasksService.getTaskByID(id)
    }

    @Post()
    createNewTask(@Body() body: CreateTaskDto): Task{
        return this.tasksService.createNewTask(body)
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id:string): void{
        return this.tasksService.deleteTaskById(id)
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id:string,
        @Body() updateTaskStatusDto: UpdateTaskStatusDto
    ): Task {
        const { status } = updateTaskStatusDto
        return this.tasksService.updateTaskStatus(id, status)
    }
}
