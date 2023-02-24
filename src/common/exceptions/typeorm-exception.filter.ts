import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common'
import { QueryFailedError } from 'typeorm'
@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()
        let optionsResponse = {
            statusCode: 500,
            message: 'database error',
        }

        const { code } = exception.driverError

        if (code && code == 23505) {
            optionsResponse = {
                message: 'Resource already exist',
                statusCode: 400,
            }
        }
        response.status(optionsResponse.statusCode).json({
            timestamp: new Date().toISOString(),
            ...optionsResponse,
        })
    }
}
