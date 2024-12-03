const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../../config/config');

// Determinar o ambiente atual (development por padrão)
const env = process.env.NODE_ENV || 'development';
const currentConfig = config[env]; // Seleciona as configurações do ambiente atual

// Inicializar o Sequelize com a configuração correta
const sequelize = new Sequelize(
    currentConfig.database,
    currentConfig.username,
    currentConfig.password,
    currentConfig
);

const db = {};

// Carregar todos os modelos no diretório atual
fs.readdirSync(__dirname)
    .filter((file) => file.indexOf('.') !== 0 && file !== 'index.js') // Ignora arquivos ocultos e `index.js`
    .forEach((file) => {
        const modelDefiner = require(path.join(__dirname, file)); // Importa o modelo
        const model = modelDefiner(sequelize, Sequelize.DataTypes); // Inicializa o modelo
        db[model.name] = model; // Adiciona o modelo ao objeto `db`
    });

// Configurar associações entre modelos
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// Adicionar Sequelize e a instância ao objeto `db`
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
