import RelatorioService from '../services/RelatorioService.js';

export default {
    async gerarRelatorioFaltasAtestados(req, res) {
        try {
            res.status(200).json({ message: 'Relatório gerado com sucesso!' });
        } catch (error) {
            res.status(400).json({ error: true, message: error.message });
        }
    }
}