import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity.js';
import { QueryFailedError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto.js';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface.js';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
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

    async signIn(createUserDto: CreateUserDto) : Promise<{accessToken: string}>{ // return TOKEN
        // check if user exist or not
        const {username, password} = createUserDto;
        const found = await this.userRepository.findOne({ where: { username } });

        if(!found){
            throw new NotFoundException('User not found');
        }
        // check if the password is correct
        //                              entered password, hashed password
        const isMatch = await bcrypt.compare(password, found.password);
        if(!isMatch){
            throw new UnauthorizedException('Invalid password');
        }
        const payload: JwtPayload = {username};
        const accessToken = await this.jwtService.sign(payload)
        return {accessToken} //TOKEN
    }
}
