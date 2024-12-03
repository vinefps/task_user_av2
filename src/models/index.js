const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../../config/config');
const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    config.development
);

const db = {};

// Carregar todos os modelos no diretório atual
fs.readdirSync(__dirname)
    .filter((file) => file.indexOf('.') !== 0 && file !== 'index.js')
    .forEach((file) => {
        const modelDefiner = require(path.join(__dirname, file)); // Importar cada modelo
        const model = modelDefiner(sequelize, Sequelize.DataTypes); // Inicializar o modelo
        db[model.name] = model; // Adicionar o modelo ao objeto `db`
    });

// Configurar associações
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
