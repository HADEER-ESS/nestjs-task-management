import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}
    @Post('/signup')
    signUp(@Body() createUserDto: CreateUserDto): Promise<void> {
        return this.authService.signUp(createUserDto);
    }
}
