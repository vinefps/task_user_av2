const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');

const Task = sequelize.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // Outros campos...
});

module.exports = Task;
