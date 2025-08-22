import RelatorioService from '../services/RelatorioService.js';

export default {
    async gerarRelatorioFaltasAtestados(req, res) {
        try {
            const { dataInicial, dataFinal } = req.body;
            if (!dataInicial || !dataFinal) {
                return res.status(400).json({
                    error: true,
                    message: 'Data inicial e final são obrigatórias'
                });
            }

            const pdfBuffer = await RelatorioService.gerarRelatorioFaltasAtestados(dataInicial, dataFinal);

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=relatorio-faltas-atestados.pdf');
            res.send(pdfBuffer);
        } catch (error) {
            res.status(400).json({ error: true, message: error.message });
        }
    }
}
