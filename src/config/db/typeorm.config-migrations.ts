import { ConfigService } from '@nestjs/config'
import { config } from 'dotenv'
import { DataSource } from 'typeorm'

import { Category } from '../../modules/category/entities/category.entity'
import { Product } from '../../modules/product/entities/product.entity'
import { Profile } from '../../modules/profile/entities/profile.entity'
import { User } from '../../modules/user/entities/user.entity'

import { createUser1676598300085 } from '../../database/migrations/1676598300085-create-user'
import { createRefeshToken1676628412533 } from '../../database/migrations/1676628412533-create-refeshToken'
import { updateUserActive1676629142358 } from '../../database/migrations/1676629142358-update-user-active'
import { removeActiveUser1676711831707 } from '../../database/migrations/1676711831707-remove-active-user'
import { createProfile1676792602190 } from '../../database/migrations/1676792602190-create-profile'
import { updateProfile1676793324994 } from '../../database/migrations/1676793324994-update-profile'
import { createProduct1676817628207 } from '../../database/migrations/1676817628207-create-product'
import { createCategory1676818231155 } from '../../database/migrations/1676818231155-create-category'
import { uniqueCategory1676819411259 } from '../../database/migrations/1676819411259-unique-category'

config()

const configService = new ConfigService()

export default new DataSource({
    type: 'postgres',
    port: 5432,
    username: configService.get('TYPEORM_USERNAME'),
    password: configService.get('TYPEORM_PASSWORD'),
    database: configService.get('TYPEORM_DATABASE'),
    entities: [User, Profile, Product, Category],
    migrations: [
        createUser1676598300085,
        createRefeshToken1676628412533,
        updateUserActive1676629142358,
        removeActiveUser1676711831707,
        createProfile1676792602190,
        updateProfile1676793324994,
        createProduct1676817628207,
        createCategory1676818231155,
        uniqueCategory1676819411259,
    ],
})
