require('dotenv').config({ path: '.env.test' });
const sequelize = require('./src/db/database');

beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync(); // Isso criará as tabelas que não existem
});

afterAll(async () => {
    await sequelize.close();
});
