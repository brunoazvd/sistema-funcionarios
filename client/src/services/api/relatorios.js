import api from './index.js'

export const gerarRelatorioFaltasAtestados = async (data) => {
    try {
        const response = await api.post('/api/relatorios/faltas-atestados', data, {
            responseType: 'blob' // Importante para receber o PDF como blob
        });

        // Criar URL para download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `relatorio-faltas-atestados-${new Date().toISOString().split('T')[0]}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);

        return { success: true };
    } catch (error) {
        throw new Error(`Erro ao gerar relatório: ${error.message}`);
    }
}

