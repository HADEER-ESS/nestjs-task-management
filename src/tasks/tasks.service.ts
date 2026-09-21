import { Injectable } from '@nestjs/common';
import { Task } from './task.model.js';

@Injectable()
export class TasksService {
    private tasks : Task[] = []

    getAllTasks(){
        return this.tasks
    }
}
