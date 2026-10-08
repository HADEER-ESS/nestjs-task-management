import { DataSource, Repository } from "typeorm";
import { Task } from "./task.entity.js";
import { CreateTaskDto } from "./dto/create-task.dto.js";
import { TaskStatus } from "./task-status.enum.js";
import { Injectable } from "@nestjs/common";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto.js";
import { User } from "../auth/user.entity.js";

@Injectable()
export class TaskRepository extends Repository<Task>{
    constructor(private dataSource: DataSource){
        super(Task, dataSource.createEntityManager())
    }
    async getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]>{
        const {status, search} = filterDto
        const query = this.createQueryBuilder('task')
        query.where({user})

        if(status){
            //                          name of variable param
            query.andWhere('task.status = :status', { status })
        }

        if(search){
            query.andWhere(
                'task.title LIKE :search OR task.description LIKE :search',
                {search: `%${search}%`}
            )
        }

        const tasks = await query.getMany()
        return tasks
    }
    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>{
        const {title, description} = createTaskDto
        let task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
            user
        })
        await this.save(task)
        return task
    }
}
