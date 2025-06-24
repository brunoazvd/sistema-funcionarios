import FuncionarioService from '../services/FuncionarioService.js';

export default {
    async criarFuncionario(req, res) {
        try {
            const funcionario = await FuncionarioService.create(req.body);
            return res.status(200).json(funcionario);
        } catch (error) {
            return res.status(400).json({ error: true, message: error.message });
        }
    },

    async atualizarFuncionario(req, res) {
        try {
            const funcionario = await FuncionarioService.update(Number(req.params.id), req.body);
            return res.status(200).json(funcionario);
        } catch (error) {
            return res.status(400).json({ error: true, message: error.message });
        }
    },

    async deletarFuncionario(req, res) {
        try {
            await FuncionarioService.delete(Number(req.params.id));
            return res.status(200).json({ message: 'Funcionário deletado com sucesso!' });
        } catch (error) {
            return res.status(400).json({ error: true, message: error.message });
        }
    },

    async buscarFuncionarioPorId(req, res) {
        try {
            const funcionario = await FuncionarioService.getById(Number(req.params.id));
            return res.status(200).json(funcionario);
        } catch (error) {
            return res.status(400).json({ error: true, message: error.message });
        }
    },

    async buscarFuncionarios(req, res) {
        try {
            const funcionarios = await FuncionarioService.getAll();
            return res.status(200).json(funcionarios);
        } catch (error) {
            return res.status(400).json({ error: true, message: error.message });
        }
    }

}