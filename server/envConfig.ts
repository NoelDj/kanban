import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: number
}

const envConfig: Config = {
    port: Number(process.env.PORT || 3000)
}

export default envConfig