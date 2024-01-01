import { Request, Response } from "express";
import { CreateResultadoService } from "../services/CreateResultadoService";
import { DisciplinaRequest } from "../models/interfaces/DisciplinaRequest";

class CreateDisciplinaController {

    async handle(request: Request, response: Response) {


        const { bimestre, disciplina, nota }: DisciplinaRequest = request.body



        const createUserService = new CreateResultadoService()
        const resultado = await createUserService.execute({
            bimestre, disciplina, nota
        })
        console.log(resultado)
        return response.json(resultado)
    }

}

export { CreateDisciplinaController }