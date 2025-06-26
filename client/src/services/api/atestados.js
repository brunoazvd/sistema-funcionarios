import api from './index.js'

export const buscarAtestadosPorFuncionarioId = async (id) => {
    try {
        const response = await api.get(`/api/atestados/buscar/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Erro ao buscar atestados: ${error.message}`);
    }
}

export const cadastrarAtestado = async (data) => {
    try {
        const response = await api.post('/api/atestados/novo', data);
        return response.data;
    } catch (error) {
        throw new Error(`Erro ao cadastrar atestado: ${error.message}`);
    }
}

export const deletarAtestado = async (id) => {
    try {
        const response = await api.delete(`/api/atestados/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Erro ao deletar atestado: ${error.message}`);
    }
}

export const atualizarAtestado = async (id, data) => {
    try {
        const response = await api.put(`/api/atestados/${id}`, data);
        return response.data;
    } catch (error) {
        throw new Error(`Erro ao atualizar atestado: ${error.message}`);
    }
}