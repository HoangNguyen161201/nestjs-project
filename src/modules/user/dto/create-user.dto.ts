import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator'
import { MESSAGES, REGEX } from '../../../modules/auth/auth.constants'

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    username: string

    @IsNotEmpty()
    @Length(8, 24)
    @Matches(REGEX.PASSWORD_RULE, {
        message: MESSAGES.PASSWORD_RUDE_MESSAGE,
    })
    password: string

    @IsNotEmpty()
    @Length(8, 24)
    @Matches(REGEX.PASSWORD_RULE, {
        message: MESSAGES.PASSWORD_RUDE_MESSAGE,
    })
    confirmPassword: string
}
