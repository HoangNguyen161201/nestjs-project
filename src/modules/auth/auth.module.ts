import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport/dist'
import EmailService from '../email/services/email.service'
import { UserModule } from '../user/user.module'
import { SendMail } from '../../common/consumers/send-mail.consumer'
import { AuthController } from './controllers/auth.controller'
import { AuthService } from './services/auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: `${configService.get('jwt.token.secret')}`,
                signOptions: {
                    expiresIn: `${configService.get('jwt.token.expiresIn')}`,
                },
            }),
        }),
        BullModule.registerQueue({
            name: 'send-mail',
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        EmailService,
        LocalStrategy,
        JwtStrategy,
        SendMail,
    ],
})
export class AuthModule {}
