import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task.model.js";

// Specify the Task entity for DB
@Entity()
export class Task {
// define the properties of the task columns
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    status: TaskStatus;
}
