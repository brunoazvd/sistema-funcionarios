import api from './index.js'

export const gerarRelatorioFaltasAtestados = async (data) => {
    try {
        const response = await api.post('/api/relatorios/faltas-atestados', data);
        return response.data;
    } catch (error) {
        throw new Error(`Erro ao gerar relatório: ${error.message}`);
    }
}
