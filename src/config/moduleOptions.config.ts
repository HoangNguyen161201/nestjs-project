import { ConfigModuleOptions } from '@nestjs/config'
import databaseConfig from './database.config'
import jwtConfig from './jwt.config'
import * as Joi from 'joi'

const moduleOptions: ConfigModuleOptions = {
    load: [databaseConfig, jwtConfig],
    isGlobal: true,
    cache: true,
    validationSchema: Joi.object({
        TYPEORM_USERNAME: Joi.string().required(),
        TYPEORM_PASSWORD: Joi.string().required(),
        TYPEORM_DATABASE: Joi.string().required(),
        TYPEORM_TYPE: Joi.string().required(),

        EXPIRESIN: Joi.string().required().default('60s'),
        SECRET: Joi.string().required(),

        EXPIRESIN_REFRESH: Joi.string().required().default('60s'),
        SECRET_REFRESH: Joi.string().required(),
    }),
}

export default moduleOptions
