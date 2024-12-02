const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuração básica do Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API APPWEB',
            version: '1.0.0',
            description: 'Documentação da API APPWEB usando Swagger',
        },
        servers: [
            {
                url: 'http://localhost:3000', // URL base do servidor
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Caminho para os arquivos com as rotas documentadas
};

// Inicializa o Swagger JSDoc
const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = {
    swaggerUi,
    swaggerSpec,
};
