
const PASSWORD_RULE = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/

const PASSWORD_RUDE_MESSAGE =
    'Password should have 1 upper case, lowcase letter along with a number and special character'

export const REGEX = {
    PASSWORD_RULE,
}

export const MESSAGES = {
    PASSWORD_RUDE_MESSAGE,
}

export const AUTH_LOGIN = 'Login successfully'
export const AUTH_LOGOUT = 'Logout successfully'
export const AUTH_REGISTER = 'Register successfully'
export const AUTH_REFRESH = 'Refresh token successfully'