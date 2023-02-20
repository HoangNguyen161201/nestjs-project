import { IsNotEmpty, IsEmail, Length, Matches } from 'class-validator'
import { MESSAGES, REGEX } from 'src/modules/auth/auth.util'

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
