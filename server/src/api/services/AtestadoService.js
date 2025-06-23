import prisma from "../../database/index.js";

class AtestadoService {
    constructor() {
        this.prisma = prisma;
    }

    async create(data) {
        try {
            const newAtestado = await this.prisma.atestado.create({
                data
            });

            return newAtestado;
        } catch (error) {
            throw new Error(`Erro ao criar atestado: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const deletedAtestado = await this.prisma.atestado.delete({
                where: { id }
            });

            return deletedAtestado;
        } catch (error) {
            throw new Error(`Erro ao deletar atestado: ${error.message}`);
        }
    }

    async update(id, data) {
        try {
            const updatedAtestado = await this.prisma.atestado.update({
                where: { id },
                data
            });

            return updatedAtestado;
        } catch (error) {
            throw new Error(`Erro ao atualizar atestado: ${error.message}`);
        }
    }

    async getByFuncionario(id) {
        try {
            const atestados = await this.prisma.atestado.findMany({
                where: { funcionarioId: id }
            });

            return atestados;
        } catch (error) {
            throw new Error(`Erro ao buscar atestados: ${error.message}`);
        }
    }

}

const service = new AtestadoService();
export default service;