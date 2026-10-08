import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { classToPlain } from "class-transformer";
import { map } from "rxjs/operators";

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler){
    // to hide the class instance and return a plain object
    return next.handle().pipe(map((data)=> classToPlain(data)))
  }
}
