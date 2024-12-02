const client = require('prom-client');

// Criação de um novo registro para métricas
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Criar métricas personalizadas
const httpRequestDuration = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duração das requisições HTTP em segundos',
    labelNames: ['method', 'route', 'status'],
});

register.registerMetric(httpRequestDuration);

module.exports = { register, httpRequestDuration };
