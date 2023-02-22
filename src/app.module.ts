import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_INTERCEPTOR, Reflector } from '@nestjs/core'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TransformInterceptor } from './common/interceptors/transform/transform.interceptor'
import moduleOptions from './config/moduleOptions.config'
import { typeOrmAsyncConfig } from './config/typeorm.config'
import { AuthModule } from './modules/auth/auth.module'
import { CategoryModule } from './modules/category/category.module'
import { EmailModule } from './modules/email/email.module'
import { GatewayModule } from './modules/gateway/gateway.module'
import { ProductModule } from './modules/product/product.module'
import { ProfileModule } from './modules/profile/profile.module'
import { UserModule } from './modules/user/user.module'

@Module({
    imports: [
        ScheduleModule.forRoot(),
        ConfigModule.forRoot(moduleOptions),
        TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
        UserModule,
        AuthModule,
        ProfileModule,
        CategoryModule,
        ProductModule,
        EmailModule,
        GatewayModule,
    ],
    controllers: [AppController],
    providers: [AppService, {
        provide: APP_INTERCEPTOR,
        useClass: TransformInterceptor
    }],
})
export class AppModule {}
 