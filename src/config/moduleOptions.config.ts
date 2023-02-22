import { ConfigModuleOptions } from '@nestjs/config'
import * as Joi from 'joi'
import databaseConfig from './database.config'
import emailConfig from './email.config'
import jwtConfig from './jwt.config'

const moduleOptions: ConfigModuleOptions = {
    load: [databaseConfig, jwtConfig, emailConfig],
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

        MAIL_SERVICE: Joi.string().required(),
        MAIL_USERNAME: Joi.string().required(),
        MAIL_CLIENT_ID: Joi.string().required(),
        MAIL_CLIENT_SECRET: Joi.string().required(),
        MAIL_REFRESH_TOKEN: Joi.string().required(),
        MAIL_REDIRECT_URI: Joi.string().required(),
    }),
}

export default moduleOptions
