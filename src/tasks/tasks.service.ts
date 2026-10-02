import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { GetTaskFilterDto } from './dto/get-task-filter.dto.js';
import { TaskRepository } from './task.repository.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity.js';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {}
    // getAllTasks(){
    //     return this.tasks
    // }

    createNewTask(data: CreateTaskDto): Promise<Task>{
        return this.taskRepository.createTask(data)
    }

    async getTaskByID(id: string): Promise<Task>{
        const found = await this.taskRepository.findOne({
            where:{id: id}
        })

        if(!found){
            throw new NotFoundException()
        }
        return found
    }

    // deleteTaskById(id: string): void{
    //     const found = this.getTaskByID(id)
    //     this.tasks = this.tasks.filter((task) => task.id !== found.id)
    // }

    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskByID(id)
    //     task!.status = status
    //     return task!
    // }

    // searchTasks(filter: GetTaskFilterDto): Task[]{
    //     const {status, search} = filter
    //     // define a temporary array to hold the result
    //     let tempTasks = this.getAllTasks()
    //     // Do something with status
    //     if(status) tempTasks = tempTasks.filter((task) => task.status === status)
    //     // Do something with search
    //     if(search) tempTasks = tempTasks.filter((task) => task.title.includes(search) || task.description.includes(search))
    //     // Return the filtered tasks
    //     return tempTasks
    // }
}
