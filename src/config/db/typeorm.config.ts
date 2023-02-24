import { ConfigModule, ConfigService } from '@nestjs/config'
import {
    TypeOrmModuleAsyncOptions,
    TypeOrmModuleOptions
} from '@nestjs/typeorm'

import { Category } from 'src/modules/category/entities/category.entity'
import { Product } from 'src/modules/product/entities/product.entity'
import { Profile } from 'src/modules/profile/entities/profile.entity'
import { User } from 'src/modules/user/entities/user.entity'

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (
        configService: ConfigService
    ): Promise<TypeOrmModuleOptions> => {
        return {
            type: 'postgres',
            port: 5432,
            username: configService.get('db.username'),
            database: configService.get('db.database'),
            password: configService.get('db.password'),
            entities: [Profile, User, Category, Product],
            logging: true,
            synchronize: false,
        }
    },
}
