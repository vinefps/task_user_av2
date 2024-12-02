const { Sequelize } = require('sequelize');
const config = require('../../config/config.js')[process.env.NODE_ENV || 'development'];

// Configuração da conexão com o banco de dados
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Testando a conexão
sequelize
    .authenticate()
    .then(() => console.log('Conexão com o banco de dados bem-sucedida'))
    .catch((err) => console.error('Erro ao conectar ao banco de dados:', err));

module.exports = sequelize;
