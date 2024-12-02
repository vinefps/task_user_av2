const express = require('express');
const { swaggerUi, swaggerSpec } = require('./utils/swagger');
const { register, httpRequestDuration } = require('./utils/metrics');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Middleware para monitoramento
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = (Date.now() - start) / 1000;
        httpRequestDuration.labels(req.method, req.route?.path || req.path, res.statusCode).observe(duration);
    });
    next();
});

// Middleware para JSON
app.use(express.json());

// Rotas de autenticação
app.use('/auth', authRoutes);

// Rotas de tarefas
app.use('/tasks', taskRoutes);

// Endpoint para métricas Prometheus
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.send(await register.metrics());
});

// Documentação da API com Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware para erros 404
app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

module.exports = app;
