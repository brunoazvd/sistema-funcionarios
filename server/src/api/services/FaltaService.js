import prisma from "../../database/index.js";

class FaltaService {
    constructor() {
        this.prisma = prisma;
    }

    async create(data) {
        try {
            const createdFalta = await this.prisma.falta.create({
                data
            });

            return createdFalta;
        } catch (error) {
            throw new Error(`Erro ao criar falta: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const deletedFalta = await this.prisma.falta.delete({
                where: {
                    id,
                },
            });

            return deletedFalta;
        } catch (error) {
            throw new Error(`Erro ao deletar falta: ${error.message}`);
        }
    }

    async update(id, data) {
        try {
            const updatedFalta = await this.prisma.falta.update({
                where: {
                    id,
                },
                data
            });

            return updatedFalta;
        } catch (error) {
            throw new Error(`Erro ao atualizar falta: ${error.message}`);
        }
    }

    async getByFuncionario(id) {
        try {
            const falta = await this.prisma.falta.findMany({
                where: {
                    funcionarioId: id,
                },
            });

            return falta;
        } catch (error) {
            throw new Error(`Erro ao buscar faltas: ${error.message}`);
        }
    }

}

const service = new FaltaService();
export default service;