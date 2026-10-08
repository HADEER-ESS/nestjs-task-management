import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./user.entity.js";

// This decorator is used to extract the user object from the request in a controller method.
export const GetUser = createParamDecorator((_data, ctx: ExecutionContext): User =>{
    const req = ctx.switchToHttp().getRequest();
    return req.user;
})