import { HttpStatus, ValidationPipe } from '@nestjs/common'

const PASSWORD_RULE = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/

const PASSWORD_RUDE_MESSAGE =
    'Password should have 1 upper case, lowcase letter along with a number and special character'

export const REGEX = {
    PASSWORD_RULE,
}

export const MESSAGES = {
    PASSWORD_RUDE_MESSAGE,
}
