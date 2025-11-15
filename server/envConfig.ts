import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: number
    jwtKey: string
}

const envConfig: Config = {
    port: Number(process.env.PORT || 3000),
    jwtKey: process.env.JWTKEY 
}

export default envConfig