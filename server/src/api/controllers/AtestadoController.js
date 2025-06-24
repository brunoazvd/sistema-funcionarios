import AtestadoService from '../services/AtestadoService.js';

export default {
    async criarAtestado(req, res) {
        try {
            const atestado = await AtestadoService.create(req.body);
            res.status(200).json(atestado)
        } catch (error) {
            res.status(400).json({ error: true, message: error.message });
        }
    },

    async atualizarAtestado(req, res) {
        try {
            const atestado = await AtestadoService.update(Number(req.params.id), req.body);
            res.status(200).json(atestado);
        } catch (error) {
            res.status(400).json({ error: true, message: error.message });
        }
    },

    async deletarAtestado(req, res) {
        try {
            await AtestadoService.delete(Number(req.params.id));
            res.status(200).json({ message: 'Atestado deletado com sucesso!' });
        } catch (error) {
            res.status(400).json({ error: true, message: error.message });
        }
    },

    async buscarPorFuncionario(req, res) {
        try {
            const atestado = await AtestadoService.getByFuncionario(Number(req.params.id));
            res.status(200).json(atestado);
        } catch (error) {
            res.status(400).json({ error: true, message: error.message });
        }
    }
}