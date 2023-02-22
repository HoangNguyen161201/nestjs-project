import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter'
import { TransformInterceptor } from './common/interceptors/transform/transform.interceptor'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(new ValidationPipe({}))
    app.useGlobalFilters(new HttpExceptionFilter())
    await app.listen(3000)
}
bootstrap()
