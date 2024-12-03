const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Verifique se o caminho está correto

module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decodificado:', decoded); // Verifica o conteúdo do payload JWT
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Erro ao decodificar token:', error);
        res.status(401).json({ error: 'Token inválido' });
    }
};