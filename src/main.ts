import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter'
import { TypeOrmExceptionFilter } from './common/exceptions/typeorm-exception.filter'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(new ValidationPipe({}))
    app.useGlobalFilters(new TypeOrmExceptionFilter())
    app.useGlobalFilters(new HttpExceptionFilter())
    await app.listen(3000)
}
bootstrap()
