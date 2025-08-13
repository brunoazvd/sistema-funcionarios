import api from "./index.js";
import { clearEmptyObjectFields } from "../../helpers/format.js";

export const cadastrarFuncionario = async (data) => {
  try {
    const response = await api.post(
      "/api/funcionarios/novo",
      clearEmptyObjectFields(data)
    );
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao cadastrar funcionário: ${error.message}`);
  }
};

export const deletarFuncionario = async (id) => {
  try {
    const response = await api.delete(`/api/funcionarios/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao deletar funcionário: ${error.message}`);
  }
};

export const atualizarFuncionario = async (id, data) => {
  try {
    const response = await api.put(
      `/api/funcionarios/${id}`,
      clearEmptyObjectFields(data)
    );
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao atualizar funcionário: ${error.message}`);
  }
};

export const buscarFuncionarioPorId = async (id) => {
  try {
    const response = await api.get(`/api/funcionarios/id/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao buscar funcionário: ${error.message}`);
  }
};

export const buscarTodosFuncionarios = async () => {
  try {
    const response = await api.get("/api/funcionarios");
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao buscar funcionários: ${error.message}`);
  }
};

export const pesquisarFuncionarios = async (data) => {
  try {
    const response = await api.post("/api/funcionarios/pesquisar", data);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao pesquisar funcionários: ${error.message}`);
  }
};
