const path = require('path');

module.exports = {
    development: {
        // suas configurações de desenvolvimento
    },
    test: {
        // suas configurações de teste
    },
    // Outras configurações, se houver
    migrationsPath: path.resolve('migrations'),
    // Você também pode especificar seedersPath, models-path, etc., se necessário
};
