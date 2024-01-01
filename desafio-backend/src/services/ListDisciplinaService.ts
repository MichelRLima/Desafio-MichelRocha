import prismaClient from "../prisma";

class ListDisciplinaService {
    async execute() {
        const disciplinas = await prismaClient.resultado.findMany({
            select: {
                id: true,
                bimestre: true,
                disciplina: true,
                nota: true,
                criadoEm: true
            }
        })

        return disciplinas

    }

}

export { ListDisciplinaService }