import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MaxLength(20)
    @MinLength(4)
    username: string;
    
    @IsString()
    @MaxLength(32)
    @MinLength(8)
    // add regex to validate password strength
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/, 
        { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character' })
    password: string;
}
