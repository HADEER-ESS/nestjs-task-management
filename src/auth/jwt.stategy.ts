import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { User } from "./user.entity.js";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtPayload } from "./jwt-payload.interface.js";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){
        super({
            //secret key
            secretOrKey:'topSecret101',
            //place the JWT in request
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()//Where TOKEN will placed
        })
    }
    // Function to validate the JWT payload and return the user associated with it
    async validate(payload: JwtPayload): Promise<User>{
        const {username} = payload;
        const user: User|null = await this.userRepository.findOne({where:{username}})

        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}
