import {
    CallHandler,
    ExecutionContext,
    Inject,
    Injectable,
    NestInterceptor,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { map, Observable } from 'rxjs'
import { ResponseMessageKey } from 'src/common/decorator/response.decorator'

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<any> {
    constructor(private reflector: Reflector) {}
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const msg = this.reflector.get<string>(ResponseMessageKey, context.getHandler()) 

        return next.handle().pipe(
            map((data) => {
                return {
                    statusCode: context.switchToHttp().getResponse().statusCode,
                    data,
                    message: msg || ''
                }
            })
        )
    }
}
