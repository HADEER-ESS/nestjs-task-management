import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../task.model.js";

export class GetTaskFilterDto {
    @IsEnum(TaskStatus)
    @IsOptional()
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}