const request = require('supertest');
const app = require('../src/app');
const { User, Task } = require('../src/models');
const jwt = require('jsonwebtoken');
const sequelize = require('../src/db/database');

let token;

beforeAll(async () => {
    await sequelize.sync({ force: true }); // Limpa e recria o banco de dados

    const user = await User.create({ username: 'testuser', password: '123456' });
    token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
});

test('Deve criar uma tarefa', async () => {
    const res = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Nova Tarefa' });

    console.log('Status:', res.statusCode);
    console.log('Resposta:', res.body);

    expect(res.statusCode).toEqual(201);
    // Remova ou ajuste esta linha:
    // expect(res.body).toHaveProperty('task');
    // Verifique se res.body possui as propriedades esperadas
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title', 'Nova Tarefa');
    expect(res.body).toHaveProperty('createdAt');
    expect(res.body).toHaveProperty('updatedAt');
});

afterAll(async () => {
    await sequelize.close();
});
