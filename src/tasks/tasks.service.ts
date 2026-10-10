import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { GetTaskFilterDto } from './dto/get-task-filter.dto.js';
import { TaskRepository } from './task.repository.js';
import { Task } from './task.entity.js';
import { User } from '../auth/user.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) {}
    
    async getTasks(filter: GetTaskFilterDto, user: User) : Promise<Task[]>{
        const {status, search} = filter
        const query = this.taskRepository.createQueryBuilder('task')
        query.where({user})

        if(status){
            //                          name of variable param
            query.andWhere('task.status = :status', { status })
        }

        if(search){
            query.andWhere(
                '(task.title LIKE :search OR task.description LIKE :search)',
                {search: `%${search}%`}
            )
        }

        const tasks = await query.getMany()
        return tasks
    }

    async createNewTask(data: CreateTaskDto, user: User): Promise<Task>{
        const {title, description} = data
        const task = this.taskRepository.create({
            title,
            description,
            status: TaskStatus.OPEN,
            user
        })
        await this.taskRepository.save(task)
        return task
    }

    async getTaskByID(id: string, user: User): Promise<Task>{
        const found = await this.taskRepository.findOne({
            where: { id, user: { id: user.id } }
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
        const result = await this.taskRepository.delete({ id, user: { id: user.id } })
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
}
