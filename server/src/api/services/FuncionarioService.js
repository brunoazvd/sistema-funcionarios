import prisma from "../../database/index.js";

class FuncionarioService {
    constructor() {
        this.prisma = prisma;
    }

    async create(data) {
        try {
            const funcionario = await prisma.funcionario.create({
                data,
            });
            return funcionario;

        } catch (error) {
            throw new Error(`Erro ao criar funcionário: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            await prisma.funcionario.delete({
                where: { id },
            });
        } catch (error) {
            throw new Error(`Erro ao deletar funcionário: ${error.message}`);
        }
    }

    async update(id, data) {
        try {
            const funcionario = await prisma.funcionario.update({
                where: { id },
                data,
            });
            return funcionario;
        } catch (error) {
            throw new Error(`Erro ao atualizar funcionário: ${error.message}`);
        }
    }

    async getAll() {
        try {
            const funcionarios = await prisma.funcionario.findMany({});
            return funcionarios;
        } catch (error) {
            throw new Error(`Erro ao buscar funcionários: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            const funcionario = await prisma.funcionario.findUnique({
                where: { id },
            });
            return funcionario;
        } catch (error) {
            throw new Error(`Erro ao buscar funcionário: ${error.message}`);
        }
    }

    async search(nome, cargo) {
        try {
            const where = {};
            if (nome) {
                where.nome = {
                    contains: nome,
                };
            }
            if (cargo) {
                where.cargo = cargo;
            }
            if (Object.keys(where).length === 0) {
                return [];
            }
            const funcionarios = await prisma.funcionario.findMany({
                where,
            });
            return funcionarios;
        } catch (error) {
            throw new Error(`Erro ao buscar funcionários: ${error.message}`);
        }
    }

}

const service = new FuncionarioService();

export default service;
