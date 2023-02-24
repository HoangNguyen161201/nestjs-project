import { registerAs } from "@nestjs/config";

export default registerAs('db', ()=> ({
    type: process.env.TYPEORM_TYPE,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
}))