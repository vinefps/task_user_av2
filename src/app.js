// src/app.js

const express = require('express');
require('dotenv').config(); // Carrega as variáveis de ambiente do .env
const app = express();
const swaggerUi = require('swagger-ui-express');
const { swaggerSpec } = require('./utils/swagger');
const { register: prometheusRegister, httpRequestDuration } = require('./utils/metrics');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const client = require('prom-client'); // Biblioteca para métricas Prometheus

// Middleware para coletar métricas padrão do Prometheus
client.collectDefaultMetrics();

// Middleware para medir a duração das requisições HTTP
app.use((req, res, next) => {
    const end = httpRequestDuration.startTimer();
    res.on('finish', () => {
        end({ method: req.method, route: req.route?.path || req.path, status_code: res.statusCode });
    });
    next();
});

// Middleware para parse de JSON
app.use(express.json());

// Rotas de autenticação
app.use('/auth', authRoutes);

// Rotas de tarefas
app.use('/tasks', taskRoutes);

// Endpoint para métricas do Prometheus
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', prometheusRegister.contentType);
    res.end(await prometheusRegister.metrics());
});

// Documentação da API com Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware para erros 404
app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

module.exports = app;
