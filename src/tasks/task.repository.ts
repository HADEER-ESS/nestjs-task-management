import { Repository } from "typeorm";
import { Task } from "./task.entity.js";

// @EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

}
