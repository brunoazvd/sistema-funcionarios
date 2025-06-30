import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker/locale/pt_BR'

const prisma = new PrismaClient()

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomDateInPastMonth() {
    const today = new Date()
    const daysAgo = getRandomInt(1, 30)
    const date = new Date(today)
    date.setDate(today.getDate() - daysAgo)
    date.setUTCHours(0, 0, 0, 0)
    return date.toISOString()
}

function randomCPF() {
    // Apenas números, formato simples para testes (não valida DV)
    return faker.helpers.replaceSymbols('###########')
}

function fixDate(date) {
    const d = new Date(date)
    d.setUTCHours(0, 0, 0, 0)
    return d.toISOString()
}

async function main() {
    const cargos = [
        'DIRETOR', 'PROFESSOR', 'MONITOR_DE_ALUNOS', 'INSPETOR_DE_ALUNOS',
        'ORIENTADOR_EDUCACIONAL', 'ORIENTADOR_PEDAGOGICO', 'AUXILIAR_SECRETARIA',
        'VIGIA', 'COZINHEIRO', 'AUXILIAR_DE_SERVICOS_GERAIS'
    ]

    const tipoContrato = ['EFETIVO', 'CONTRATO']
    const tipoAtestado = ['COMPARECIMENTO', 'ATESTADO_MEDICO']
    const sexos = ['M', 'F']

    for (let i = 0; i < 200; i++) {
        const sexo = faker.helpers.arrayElement(sexos)
        const nome = `${faker.person.firstName({ sex: sexo === 'M' ? 'male' : 'female' })} ${faker.person.lastName()} ${faker.person.lastName()}`
        const email = faker.internet.email({ firstName: nome.split(' ')[0], lastName: `${nome.split(' ')[1]}${getRandomInt(1, 99)}`, provider: `${Math.random() > 0.5 ? 'escola.com' : 'gmail.com'}` }).toLowerCase()

        const funcionario = await prisma.funcionario.create({
            data: {
                nome,
                cargo: faker.helpers.arrayElement(cargos),
                status: 'ATIVO',
                sexo,
                cpf: randomCPF(),
                email,
                telefone: faker.phone.number('(##) 9####-####'),
                dataNascimento: fixDate(faker.date.birthdate({ min: 18, max: 60, mode: 'age' })),
                dataAdmissao: fixDate(faker.date.past({ years: 3 })),
                tipoContrato: faker.helpers.arrayElement(tipoContrato)
            }
        })

        const faltas = []
        const faltaDatas = new Set()
        const numFaltas = getRandomInt(0, 5)

        for (let j = 0; j < numFaltas; j++) {
            const dataFalta = fixDate(faker.date.past({ years: 1 }))
            if (faltaDatas.has(dataFalta)) continue
            faltaDatas.add(dataFalta)

            const falta = await prisma.falta.create({
                data: {
                    funcionarioId: funcionario.id,
                    data: new Date(dataFalta),
                    observacao: Math.random() > 0.5 ? faker.lorem.sentence() : null
                }
            })

            faltas.push({ falta, data: dataFalta })
        }

        // Adicionar até 3 atestados em faltas aleatórias
        const faltasComAtestado = getRandomInt(0, Math.min(3, faltas.length))
        const usadas = new Set()
        for (let k = 0; k < faltasComAtestado; k++) {
            let index
            do {
                index = getRandomInt(0, faltas.length - 1)
            } while (usadas.has(index))
            usadas.add(index)

            const randomTipo = faker.helpers.arrayElement(tipoAtestado);

            await prisma.atestado.create({
                data: {
                    funcionarioId: funcionario.id,
                    data: new Date(faltas[index].data),
                    dias: randomTipo === "ATESTADO_MEDICO" ? getRandomInt(1, 5) : 0,
                    tipo: randomTipo,
                    observacao: Math.random() > 0.3 ? faker.lorem.words(3) : null
                }
            })
        }
    }

    console.log('Seed com faker executada com sucesso!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
