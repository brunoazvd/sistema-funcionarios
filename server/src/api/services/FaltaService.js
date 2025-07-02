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

    async update(id, updates) {
        try {
            const updatedFalta = await this.prisma.falta.update({
                where: {
                    id,
                },
                data: updates,
                include: {
                    funcionario: {
                        select: {
                            nome: true,
                        },
                    }
                }
            });

            return updatedFalta;
        } catch (error) {
            throw new Error(`Erro ao atualizar falta: ${error.message}`);
        }
    }

    async getAll() {
        try {
            const faltas = await this.prisma.falta.findMany({});
            return faltas;
        } catch (error) {
            throw new Error(`Erro ao buscar faltas: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            const falta = await this.prisma.falta.findUnique({
                where: {
                    id,
                },
            });

            return falta;
        } catch (error) {
            throw new Error(`Erro ao buscar falta: ${error.message}`);
        }
    }

    async getByFuncionario(id) {
        try {
            const faltas = await this.prisma.falta.findMany({
                where: {
                    funcionarioId: id,
                },
                orderBy: {
                    data: "desc",
                },
            });

            return faltas;
        } catch (error) {
            throw new Error(`Erro ao buscar faltas: ${error.message}`);
        }
    }

    async search(initialDate, finalDate, funcionario) {
        try {
            const where = {}
            if (initialDate || finalDate) {
                where.data = {}
                initialDate && (where.data.gte = new Date(initialDate))
                finalDate && (where.data.lte = new Date(finalDate))
            }

            if (funcionario) {
                where.funcionario = {
                    nome: {
                        contains: funcionario,
                    },
                }
            }

            if (Object.keys(where).length === 0) {
                return [];
            }

            const faltas = await this.prisma.falta.findMany({
                where,
                include: {
                    funcionario: {
                        select: {
                            nome: true,
                        },
                    }
                },
                orderBy: {
                    data: "desc",
                },
            });

            return faltas;
        } catch (error) {
            throw new Error(`Erro ao buscar faltas: ${error.message}`);
        }
    }

}

const service = new FaltaService();
export default service;