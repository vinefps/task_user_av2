// server.js

// Exibe o valor de NODE_ENV
console.log('NODE_ENV:', process.env.NODE_ENV);

// Carrega as variáveis de ambiente do .env apenas se não estiver em produção
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = require('./src/app'); // Importa o app configurado
const sequelize = require('./src/db/database'); // Importa a configuração do banco de dados

// Porta onde o servidor vai rodar
const PORT = process.env.PORT || 3000;


// Sincroniza os modelos com o banco de dados
sequelize
    .sync({ force: false })
    .then(() => {
        console.log('Tabelas sincronizadas com sucesso');
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
            console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
            console.log(`PORT: ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Erro ao sincronizar tabelas:', err);
    });

// Trata erros globais
process.on('uncaughtException', (err) => {
    console.error('Erro não capturado:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Rejeição não tratada:', reason);
});
