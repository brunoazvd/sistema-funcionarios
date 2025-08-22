import prisma from "../../database/index.js";
import puppeteer from "puppeteer";

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
                            cargo: true,
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
                            cargo: true,
                        },
                    },
                },
            });

            // Organizar dados por funcionário
            const dadosOrganizados = this.organizarDadosPorFuncionario(faltas, atestados);

            // Gerar PDF
            const pdfBuffer = await this.gerarPDF(dadosOrganizados, dataInicial, dataFinal);

            return pdfBuffer;
        } catch (error) {
            throw new Error(`Erro ao gerar relatório: ${error.message}`);
        }
    }

    organizarDadosPorFuncionario(faltas, atestados) {
        const funcionarios = new Map();

        faltas.forEach(falta => {
            const funcionarioId = falta.funcionario.id;
            if (!funcionarios.has(funcionarioId)) {
                funcionarios.set(funcionarioId, {
                    nome: falta.funcionario.nome,
                    cargo: falta.funcionario.cargo,
                    faltas: [],
                    atestados: []
                });
            }
            funcionarios.get(funcionarioId).faltas.push({
                data: falta.data,
                observacao: falta.observacao
            });
        });

        atestados.forEach(atestado => {
            const funcionarioId = atestado.funcionario.id;
            if (!funcionarios.has(funcionarioId)) {
                funcionarios.set(funcionarioId, {
                    nome: atestado.funcionario.nome,
                    cargo: atestado.funcionario.cargo,
                    faltas: [],
                    atestados: []
                });
            }
            funcionarios.get(funcionarioId).atestados.push({
                data: atestado.data,
                observacao: atestado.observacao,
                tipo: atestado.tipo,
                dias: atestado.dias
            });
        });

        // Converter para array e ordenar por nome
        return Array.from(funcionarios.values()).sort((a, b) =>
            a.nome.localeCompare(b.nome, 'pt-BR')
        );
    }

    async gerarPDF(dados, dataInicial, dataFinal) {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        try {
            const page = await browser.newPage();

            const html = this.gerarHTMLRelatorio(dados, dataInicial, dataFinal);

            await page.setContent(html, { waitUntil: 'networkidle0' });

            const pdfBuffer = await page.pdf({
                format: 'A4',
                landscape: true,
                printBackground: true,
                margin: {
                    top: '10mm',
                    right: '10mm',
                    bottom: '10mm',
                    left: '10mm'
                }
            });

            return pdfBuffer;
        } finally {
            await browser.close();
        }
    }

    gerarHTMLRelatorio(dados, dataInicial, dataFinal) {
        const formatarData = (data) => {
            // Se data já é um objeto Date, usar diretamente
            if (data instanceof Date) {
                return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
            }
            // Se é string, tentar converter
            const dataObj = new Date(data);
            return dataObj.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
        };

        const linhasTabela = dados.map(funcionario => {
            const faltasFormatadas = funcionario.faltas.length > 0
                ? funcionario.faltas
                    .map(falta => `<li>${formatarData(falta.data)}</li>`)
                    .join('')
                : '';

            const atestadosFormatados = funcionario.atestados.length > 0
                ? funcionario.atestados
                    .map(atestado => {
                        let texto = formatarData(atestado.data);

                        // Adicionar dias se for atestado médico
                        if (atestado.tipo === 'ATESTADO_MEDICO' && atestado.dias > 0) {
                            texto += ` (${atestado.dias} dia${atestado.dias > 1 ? 's' : ''})`;
                        }

                        // Adicionar observação se existir
                        if (atestado.observacao) {
                            texto += ` - ${atestado.observacao}`;
                        }

                        return `<li>${texto}</li>`;
                    })
                    .join('')
                : '';

            return `
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">${funcionario.nome}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${funcionario.cargo}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">
                        <ul style="margin: 0; padding-left: 15px;">
                            ${faltasFormatadas}
                        </ul>
                    </td>
                    <td style="border: 1px solid #ddd; padding: 8px;">
                        <ul style="margin: 0; padding-left: 15px;">
                            ${atestadosFormatados}
                        </ul>
                    </td>
                </tr>
            `;
        }).join('');

        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Relatório de Faltas e Atestados</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 10px;
                        font-size: 12px;
                    }
                    h1 {
                        text-align: center;
                        color: #333;
                        margin-bottom: 20px;
                        font-size: 18px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 10px;
                    }
                    th {
                        background-color: #dfdfdf;
                        color: black;
                        padding: 8px;
                        text-align: left;
                        border: 1px solid #ddd;
                        font-size: 14px;
                    }
                    td {
                        padding: 6px;
                        border: 1px solid #ddd;
                        vertical-align: top;
                        font-size: 11px;
                    }
                    tr:nth-child(even) {
                        background-color: #f9f9f9;
                    }
                    ul {
                        list-style-type: disc;
                        margin: 0;
                        padding-left: 15px;
                    }
                    li {
                        margin-bottom: 2px;
                    }
                </style>
            </head>
            <body>
                <h1>Faltas e Atestados de ${formatarData(dataInicial)} até ${formatarData(dataFinal)}</h1>
                
                <table>
                    <thead>
                        <tr>
                            <th style="width: 25%;">Funcionário</th>
                            <th style="width: 20%;">Cargo</th>
                            <th style="width: 20%;">Faltas</th>
                            <th style="width: 35%;">Atestados</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${linhasTabela}
                    </tbody>
                </table>
            </body>
            </html>
        `;
    }
}

const service = new RelatorioService();
export default service;




