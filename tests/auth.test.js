const request = require('supertest');
const app = require('../src/app');
const { User, Task } = require('../src/models');

beforeAll(async () => {
    await User.destroy({ where: {} });
    // Continue com a criação do usuário
});

try {
    describe('Testes para /auth/register', () => {
        it('Deve registrar um usuário com sucesso', async () => {
            const res = await request(app)
                .post('/auth/register')
                .send({ username: 'testuser', password: '123456' });

            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('user');
        });

        it('Deve retornar erro ao registrar com dados inválidos', async () => {
            const res = await request(app)
                .post('/auth/register')
                .send({ username: '', password: '' });

            expect(res.statusCode).toEqual(400); // Certifique-se de que a API retorna 400 para dados inválidos
            expect(res.body).toHaveProperty('error'); // Opcional: validar mensagem de erro
        });
    });

} catch (error) {
    console.error('Erro no teste:', error);
    throw error;
}
