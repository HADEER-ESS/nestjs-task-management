import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { GetTaskFilterDto } from './dto/get-task-filter.dto.js';
import { TaskRepository } from './task.repository.js';
import { Task } from './task.entity.js';
import { User } from '../auth/user.entity.js';

@Injectable()
export class TasksService {
    constructor(
        private taskRepository: TaskRepository
    ) {}
    
    async getTasks(filter: GetTaskFilterDto, user: User) : Promise<Task[]>{
        return this.taskRepository.getTasks(filter, user)
    }

    createNewTask(data: CreateTaskDto, user: User): Promise<Task>{
        return this.taskRepository.createTask(data, user)
    }

    async getTaskByID(id: string, user: User): Promise<Task>{
        const found = await this.taskRepository.findOne({
            where:{id: id, user}
        })

        if(!found){
            throw new NotFoundException()
        }
        return found
    }

    async deleteTaskById(id: string, user: User): Promise<void>{
        //remove => need to get the entity then remove it
        // const found = await this.getTaskByID(id)
        // await this.taskRepository.remove(found)

        //delete => delete directly by id, or property, or condition
        const result = await this.taskRepository.delete({id, user})
        if(result.affected === 0){
            throw new NotFoundException(`Task with ID ${id} not found`)
        }
    }

    async updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
        const task = await this.getTaskByID(id, user)
        task.status = status
        await this.taskRepository.save(task)
        return task
    }

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
