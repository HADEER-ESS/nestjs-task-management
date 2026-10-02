import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MaxLength(10)
    @MinLength(3)
    userName: string;
    
    @IsString()
    password: string;
}
