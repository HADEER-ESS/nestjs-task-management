import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum.js";
import { User } from "../auth/user.entity.js";
import { Exclude } from "class-transformer";

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

    @ManyToOne(
        type => User,
        user => user.tasks,
        {eager: false}
    )
    @Exclude({toPlainOnly: true})
    user: User;
}
