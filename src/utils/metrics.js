// src/utils/metrics.js

const client = require('prom-client');

// Registrador do Prometheus
const register = client.register;

// Definição do histograma para duração das requisições HTTP
const httpRequestDuration = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duração das requisições HTTP em segundos',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.1, 0.5, 1, 1.5, 2, 5], // Intervalos para medir a duração
});

module.exports = {
    register,
    httpRequestDuration,
};
