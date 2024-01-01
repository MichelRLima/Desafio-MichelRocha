import { Router, Request, Response, request, response } from "express";
import { CreateDisciplinaController } from "./controllers/CreateResultadoController";
import { RemoveDisciplinaController } from "./controllers/RemoveDisciplinaController";
import { ListDisciplinaController } from "./controllers/ListDisciplinaController";

const router = Router()
router.get("/test", (request: Request, response: Response) => {
    return response.json({ ok: true })
})

//Rotas para criar as disciplinas com notas

router.post('/disciplina', new CreateDisciplinaController().handle)
router.delete("/disciplina/remove", new RemoveDisciplinaController().handle)
router.get("/disciplina/list", new ListDisciplinaController().handle)
export { router }