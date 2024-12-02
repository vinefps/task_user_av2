const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, password } = req.body;

    // Validação manual
    if (!username || !password) {
        return res.status(400).json({ error: 'Username e password são obrigatórios' });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ username, password: hashedPassword });
        res.status(201).json({ user });
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: 'Username já está em uso' });
        }
        res.status(500).send(err);
    }
};
exports.login = async (req, res) => {
    const { username, password } = req.body;

    // Verificando se o usuário existe
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).send('Usuário não encontrado');

    // Comparando a senha fornecida com a armazenada no banco
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).send('Senha inválida');

    // Gerando o token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Expira em 1 hora

    res.header('authorization', token).send({ token });
};
