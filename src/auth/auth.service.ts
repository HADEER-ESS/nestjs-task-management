import { ConflictException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from './user.entity.js';
import { QueryFailedError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto.js';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async signUp(createUserDto: CreateUserDto): Promise<void>{
        const { username, password } = createUserDto;
        //hashing the password
        const salt = await bcrypt.genSalt(); // generate the SALT
        const hashedPassword = await bcrypt.hash(password, salt); // hash the password

        let user = this.userRepository.create({ username, password: hashedPassword });
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
