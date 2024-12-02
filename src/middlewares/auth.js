const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send('Acesso negado');

    try {
        // Verifica o token (removendo a palavra "Bearer " do início do token)
        const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = verified; // Salva os dados do token no request
        next(); // Continua para a próxima função
    } catch (err) {
        res.status(400).send('Token inválido');
    }
};
