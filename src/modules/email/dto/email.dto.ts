import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class EmailDto {
    @IsEmail()
    recipient: string

    @IsString()
    @IsNotEmpty()
    subject: string

    @IsString()
    @IsNotEmpty()
    content: string

    @IsDateString()
    date: string
}

export default EmailDto
