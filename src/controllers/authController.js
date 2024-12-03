// src/controllers/authController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');


exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log('Dados recebidos no registro:', { username, password });

        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ error: 'Usuário já existe' });
        }

        // Criar o usuário (o hook `beforeCreate` aplicará o hash automaticamente)
        const user = await User.create({ username, password });

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
        console.log('Tentativa de login para:', username);

        // Encontrar o usuário
        const user = await User.findOne({ where: { username } });
        console.log('Usuário encontrado:', user);

        if (!user) {
            console.log('Usuário não encontrado.');
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        // Verificar a senha
        console.log('Senha enviada:', password);
        console.log('Hash no banco:', user.password);
        const isValid = await bcrypt.compare(password, user.password);
        console.log('A senha é válida?', isValid);

        if (!isValid) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        // Gerar token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Token gerado:', token);

        res.json({ token });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};