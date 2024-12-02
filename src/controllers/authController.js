// src/controllers/authController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log('Dados recebidos:', { username, password });
        console.log('Iniciando registro');
        const existingUser = await User.findOne({ where: { username } });
        console.log('Verificando usuário existente:', existingUser);

        if (existingUser) {
            return res.status(400).json({ error: 'Usuário já existe' });
        }
        console.log('Dados recebidos para registro:', username);

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword });

        console.log('Usuário criado:', user);

        res.status(201).json({ user });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Encontrar o usuário
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        // Verificar a senha
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        // Gerar token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
