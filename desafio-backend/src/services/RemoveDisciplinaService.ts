import prismaClient from "../prisma";
import { RemoveDisciplinaRequest } from "../models/interfaces/RemoveDisciplinaRequest";

class RemoveDisciplinaService {
    async execute({ disciplina_id }: RemoveDisciplinaRequest) {

        if (disciplina_id) {
            const removeDisciplina = await prismaClient.resultado.delete({
                where: {
                    id: disciplina_id
                }
            })

            return removeDisciplina

        }

    }
}

export { RemoveDisciplinaService }