import FaltaService from '../services/FaltaService';

export default {
    async criarFalta(req, res) {
        try {
            const falta = await FaltaService.create(req.body);
            return res.status(200).json(falta);
        } catch (error) {
            return res.status(400).json({ error: true, message: error.message });
        }
    },

    async atualizarFalta(req, res) {
        try {
            const falta = await FaltaService.update(Number(req.params.id), req.body);
            return res.status(200).json(falta);
        } catch (error) {
            return res.status(400).json({ error: true, message: error.message });
        }
    },

    async deletarFalta(req, res) {
        try {
            await FaltaService.delete(Number(req.params.id));
            return res.status(200).json({ message: 'Falta deletada com sucesso!' });
        } catch (error) {
            return res.status(400).json({ error: true, message: error.message });
        }
    },

    async buscarPorFuncionario(req, res) {
        try {
            const faltas = await FaltaService.getByFuncionario(Number(req.params.id));
            return res.status(200).json(faltas);
        } catch (error) {
            return res.status(400).json({ error: true, message: error.message });
        }
    }
}