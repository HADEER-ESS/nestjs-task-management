import { DataSource, Repository } from "typeorm";
import { Task } from "./task.entity.js";
import { CreateTaskDto } from "./dto/create-task.dto.js";
import { TaskStatus } from "./task-status.enum.js";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TaskRepository extends Repository<Task>{
    constructor(private dataSource: DataSource){
        super(Task, dataSource.createEntityManager())
    }
    async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
        const {title, description} = createTaskDto
        let task = this.create({
            title,
            description,
            status: TaskStatus.OPEN
        })
        await this.save(task)
        return task
    }
}
