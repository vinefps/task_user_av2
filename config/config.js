if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        dialectOptions: {
            charset: 'utf8mb4',
        },
        define: {
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci',
        },
    },
    production: {
        use_env_variable: 'DATABASE_URL',
        dialect: 'mysql',
        dialectOptions: {
            charset: 'utf8mb4',
        },
        define: {
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci',
        },
    },
};
