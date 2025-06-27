import api from './index.js'

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

export const buscarAtestadoPorId = async (id) => {
    try {
        const response = await api.get(`/api/atestados/id/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Erro ao buscar atestados: ${error.message}`);
    }
}

export const buscarTodosAtestados = async () => {
    try {
        const response = await api.get('/api/atestados/todos');
        return response.data;
    } catch (error) {
        throw new Error(`Erro ao buscar atestados: ${error.message}`);
    }
}

export const buscarAtestadosPorFuncionarioId = async (id) => {
    try {
        const response = await api.get(`/api/atestados/funcionario/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Erro ao buscar atestados: ${error.message}`);
    }
}

export const pesquisarAtestados = async (data) => {
    try {
        console.log(data)
        const response = await api.post('/api/atestados/pesquisar', data);
        return response.data;
    } catch (error) {
        throw new Error(`Erro ao pesquisar atestados: ${error.message}`);
    }
}