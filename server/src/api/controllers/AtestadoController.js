import AtestadoService from '../services/AtestadoService.js';

export default {
    async criarAtestado(req, res) {
        try {
            console.log(req.body, "controller")
            const atestado = await AtestadoService.create(req.body);
            res.status(200).json(atestado)
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

    async atualizarAtestado(req, res) {
        try {
            const atestado = await AtestadoService.update(Number(req.params.id), req.body);
            res.status(200).json(atestado);
        } catch (error) {
            res.status(400).json({ error: true, message: error.message });
        }
    },


    async buscarTodos(req, res) {
        try {
            const atestados = await AtestadoService.getAll();
            res.status(200).json(atestados);
        } catch (error) {
            res.status(400).json({ error: true, message: error.message });
        }
    },

    async buscarPorId(req, res) {
        try {
            const atestado = await AtestadoService.getById(Number(req.params.id));
            res.status(200).json(atestado);
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
    },

    async pesquisar(req, res) {
        try {
            const atestados = await AtestadoService.search(req.body.dataInicial, req.body.dataFinal, req.body.funcionario);
            res.status(200).json(atestados);
        } catch (error) {
            res.status(400).json({ error: true, message: error.message });
        }
    }
}