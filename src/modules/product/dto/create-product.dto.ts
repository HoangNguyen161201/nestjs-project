import { IsNumber, IsString } from 'class-validator'

export class CreateProductDto {
    @IsString()
    name: string

    @IsNumber()
    price: number

    urlImgs: string[]

    quantity: number

    description: string

    categoryId: number
}
