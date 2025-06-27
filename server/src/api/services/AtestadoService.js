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

    async update(id, updates) {
        try {
            console.log(id)
            console.log(updates)
            const updatedAtestado = await this.prisma.atestado.update({
                where: {
                    id: id
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

            return updatedAtestado;
        } catch (error) {
            throw new Error(`Erro ao atualizar atestado: ${error.message}`);
        }
    }

    async getAll() {
        try {
            const atestados = await this.prisma.atestado.findMany({});
            return atestados;
        } catch (error) {
            throw new Error(`Erro ao buscar atestados: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            const atestado = await this.prisma.atestado.findUnique({
                where: { id }
            });

            return atestado;
        } catch (error) {
            throw new Error(`Erro ao buscar atestado: ${error.message}`);
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

            const atestados = await this.prisma.atestado.findMany({
                where,
                include: {
                    funcionario: {
                        select: {
                            nome: true,
                        },
                    }
                }
            });

            return atestados;
        } catch (error) {
            throw new Error(`Erro ao buscar atestados: ${error.message}`);
        }
    }
}

const service = new AtestadoService();
export default service;