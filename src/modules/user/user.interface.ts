import { UserRole } from "./entities/user.entity"

export interface UserUpdOptions {
    username: string
    password: string
    role: UserRole
    refreshToken: string
}
