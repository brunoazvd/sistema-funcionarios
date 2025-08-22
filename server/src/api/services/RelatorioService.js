import prisma from "../../database/index.js";

class RelatorioService {
    constructor() {
        this.prisma = prisma;
    }

    async gerarRelatorioFaltasAtestados(dataInicial, dataFinal) {
        try {
            const faltas = await this.prisma.falta.findMany({
                where: {
                    data: {
                        gte: new Date(dataInicial),
                        lte: new Date(dataFinal),
                    },
                },
                include: {
                    funcionario: {
                        select: {
                            nome: true,
                            id: true,
                        },
                    },
                },
            });

            const atestados = await this.prisma.atestado.findMany({
                where: {
                    data: {
                        gte: new Date(dataInicial),
                        lte: new Date(dataFinal),
                    },
                },
                include: {
                    funcionario: {
                        select: {
                            nome: true,
                            id: true,
                        },
                    },
                },
            });

            return { faltas, atestados };
        } catch (error) {
            throw new Error(`Erro ao gerar relatório: ${error.message}`);
        }
    }
}

const service = new RelatorioService();

export default service;