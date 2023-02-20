import { IsInt, IsString, Length, Max, Min } from 'class-validator'

export class CreateProfileDto {
    @Length(4, 20)
    lastName: string

    @IsInt()
    @Min(12)
    @Max(100)
    age: number

    @Length(4, 20)
    fistName: string

    @IsString()
    numberPhone: string

    address: string

    job: string

    avatar: string
}
