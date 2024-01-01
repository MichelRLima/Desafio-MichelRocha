import prismaClient from "../prisma";
import { DisciplinaRequest } from "../models/interfaces/DisciplinaRequest";

class CreateResultadoService {

    async execute({ bimestre, disciplina, nota }: DisciplinaRequest) {

        if (!bimestre || !disciplina || !nota) {
            throw new Error("Por favor, adicione todos os dados");
        }


        const resultadoExistente = await prismaClient.resultado.findFirst({
            where: {
                bimestre: bimestre,
                disciplina: disciplina,
            },
        });

        if (resultadoExistente) {
            throw new Error("Esta disciplina já foi adicionada no mesmo bimestre");
        }

        const dataCriacao = new Date();

        const resultado = await prismaClient.resultado.create({
            data: {
                bimestre: bimestre,
                disciplina: disciplina,
                nota: nota,
                criadoEm: dataCriacao.toISOString(),
                atualizadoEm: dataCriacao.toISOString(),
            },
            select: {
                id: true,
                bimestre: true,
                disciplina: true,
                nota: true,
                criadoEm: true
            }
        });

        return resultado;
    }
}

export { CreateResultadoService };
