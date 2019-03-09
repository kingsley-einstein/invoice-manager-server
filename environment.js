import { config } from 'dotenv';

config();

export const environment = {
    jwtSecret: process.env.JWT_SECRET,
    db: process.env.DB,
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS,
    mode: process.env.MODE,
    adminUser: process.env.ADMIN_USER,
    adminPass: process.env.ADMIN_PASSWORD
};