import { Injectable } from '@nestjs/common';
import { User } from './user.entity.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto.js';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async createUser(createUserDto: CreateUserDto){
        const { userName, password } = createUserDto;
        //hashing the password

        let user = this.userRepository.create({
            name: userName,
            password
        });

        await this.userRepository.save(user);
    }
}
