const Task = require('../models/task');

exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Verificar se o usuário autenticado está disponível
        const userId = req.user.id;

        // Criar a tarefa
        const task = await Task.create({ title, description, userId });

        res.status(201).json({ task });
    } catch (error) {
        console.error('Erro ao criar tarefa:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const userId = req.user.id;

        // Buscar todas as tarefas associadas ao usuário autenticado
        const tasks = await Task.findAll({ where: { userId } });

        res.status(200).json(tasks);
    } catch (error) {
        console.error('Erro ao listar tarefas:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        // Atualizar tarefa específica
        const task = await Task.findOne({ where: { id, userId: req.user.id } });

        if (!task) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }

        task.title = title || task.title;
        task.description = description || task.description;

        await task.save();

        res.status(200).json(task);
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findOne({ where: { id, userId: req.user.id } });

        if (!task) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }

        await task.destroy();

        res.status(200).json({ message: 'Tarefa excluída com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir tarefa:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
