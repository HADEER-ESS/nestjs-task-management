import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model.js';
import { v4 as uuid} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { GetTaskFilterDto } from './dto/get-task-filter.dto.js';

@Injectable()
export class TasksService {
    private tasks : Task[] = []

    getAllTasks(){
        return this.tasks
    }

    createNewTask(data: CreateTaskDto): Task{
        const {title, description} = data
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task)
        return task
    }

    getTaskByID(id: string): Task{
        const taskExist = this.tasks.findIndex((task) => task.id === id)
        if(taskExist === -1){
            throw new NotFoundException()
        }
        return this.tasks[taskExist]
    }

    deleteTaskById(id: string): void{
        this.tasks = this.tasks.filter((task) => task.id !== id)
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskByID(id)
        task!.status = status
        return task!
    }

    searchTasks(filter: GetTaskFilterDto): Task[]{
        const {status, search} = filter
        // define a temporary array to hold the result
        let tempTasks = this.getAllTasks()
        // Do something with status
        if(status) tempTasks = tempTasks.filter((task) => task.status === status)
        // Do something with search
        if(search) tempTasks = tempTasks.filter((task) => task.title.includes(search) || task.description.includes(search))
        // Return the filtered tasks
        return tempTasks
    }
}
