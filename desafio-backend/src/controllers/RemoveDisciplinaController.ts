import { Response, Request } from "express";

import { RemoveDisciplinaService } from "../services/RemoveDisciplinaService";

class RemoveDisciplinaController {

    async handle(request: Request, response: Response) {
        const disciplina_id = request.query.disciplina_id as string
        const removeDisciplinaService = new RemoveDisciplinaService()
        const removeDisciplina = removeDisciplinaService.execute({ disciplina_id })
        return response.json(removeDisciplina)
    }


}

export { RemoveDisciplinaController }