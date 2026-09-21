import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model.js';
import { v4 as uuid} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto.js';

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

    getTaskByID(id: string): Task|null{
        const taskExist = this.tasks.findIndex((task) => task.id === id)
        if(taskExist === -1)return null
        console.log("idx " , taskExist, "task " , this.tasks[taskExist])
        return this.tasks[taskExist]
    }

    deleteTaskById(id: string): void{
        this.tasks = this.tasks.filter((task) => task.id !== id)
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const updatedTask = this.tasks.find((task) => task.id === id);
        if (!updatedTask) {
            throw new Error(`Task with ID ${id} not found.`);
        }
        let newTask: Task = {
            ...updatedTask,
            status,
        }
        this.tasks = this.tasks.map((task) => task.id === id ? newTask : task)
        return newTask
    }
}
