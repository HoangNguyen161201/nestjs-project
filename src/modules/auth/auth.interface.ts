
export interface JWTSignOptions {
    secret: string
}

export interface ResponseAuth {
    username: string
    accessToken: string
    refreshToken?: string
}
