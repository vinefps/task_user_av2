const { Sequelize } = require('sequelize');
const config = require('../../config/config.js')[process.env.NODE_ENV || 'development'];


let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Testando a conexão
sequelize
    .authenticate()
    .then(() => console.log('Conexão com o banco de dados bem-sucedida'))
    .catch((err) => console.error('Erro ao conectar ao banco de dados:', err));

module.exports = sequelize;
