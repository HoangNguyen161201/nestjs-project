import { registerAs } from '@nestjs/config'

export default registerAs('jwt', () => ({
    token: {
        expiresIn: process.env.EXPIRESIN,
        secret: process.env.SECRET,
    },
    refreshToken: {
        expiresIn: process.env.EXPIRESIN_REFRESH,
        secret: process.env.SECRET_REFRESH,
    },
}))
