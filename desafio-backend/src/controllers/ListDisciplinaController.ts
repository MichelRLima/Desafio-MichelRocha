import { Request, Response } from "express";
import { ListDisciplinaService } from "../services/ListDisciplinaService";

class ListDisciplinaController {
    async handle(request: Request, response: Response) {
        const listDisciplinaService = new ListDisciplinaService()
        const disciplinas = await listDisciplinaService.execute()
        return response.json(disciplinas)
    }

}

export { ListDisciplinaController }