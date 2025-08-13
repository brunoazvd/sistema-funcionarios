import api from "./index.js";
import { clearEmptyObjectFields } from "../../helpers/format.js";

export const cadastrarFalta = async (data) => {
  try {
    const response = await api.post(
      "/api/faltas/novo",
      clearEmptyObjectFields(data)
    );
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao cadastrar falta: ${error.message}`);
  }
};

export const deletarFalta = async (id) => {
  try {
    const response = await api.delete(`/api/faltas/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao deletar falta: ${error.message}`);
  }
};

export const atualizarFalta = async (id, data) => {
  try {
    const response = await api.put(
      `/api/faltas/${id}`,
      clearEmptyObjectFields(data)
    );
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao atualizar falta: ${error.message}`);
  }
};

export const buscarFaltaPorId = async (id) => {
  try {
    const response = await api.get(`/api/faltas/id/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao buscar falta: ${error.message}`);
  }
};

export const buscarTodasFaltas = async () => {
  try {
    const response = await api.get("/api/faltas/todos");
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao buscar faltas: ${error.message}`);
  }
};

export const buscarFaltasPorFuncionarioId = async (id) => {
  try {
    const response = await api.get(`/api/faltas/funcionario/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao buscar faltas: ${error.message}`);
  }
};

export const pesquisarFaltas = async (data) => {
  try {
    const response = await api.post("/api/faltas/pesquisar", data);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao pesquisar faltas: ${error.message}`);
  }
};
