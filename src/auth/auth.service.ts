import { ConflictException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from './user.entity.js';
import { QueryFailedError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto.js';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async signUp(createUserDto: CreateUserDto): Promise<void>{
        const { username, password } = createUserDto;
        //hashing the password

        let user = this.userRepository.create({ username, password });
        try {
            await this.userRepository.save(user);
        } catch (error: unknown) {
            if (error instanceof QueryFailedError) {
                const driverError: unknown = error.driverError;
                if (
                    typeof driverError === 'object' &&
                    driverError !== null &&
                    'code' in driverError &&
                    driverError.code === '23505'
                ) {
                    throw new ConflictException('Username already exists');
                }
            }else{
                throw new InternalServerErrorException();
            }
        }
    }
}
