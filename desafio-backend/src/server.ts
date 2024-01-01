import express, { Request, Response, NextFunction, request } from "express";
import { router } from "./routes";
import "express-async-errors"
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger.json'


const app = express();
const port = 3333
app.use(express.json()) //informando para o express que receberemos e devolveremos json
app.use(cors())
app.use(router)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Tratamento de erro
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return response.status(400).json({
            error: err.message,

        })
    }
    return response.status(500).json({
        status: 'error',
        message: "Internal server erros"
    })
})

app.get('/terms', (request: Request, response: Response) => {
    return response.json({
        message: "Termos de serviço"
    })
})

app.listen(port, () => {
    console.log("Servidor rodando na porta 3333 - Desafio vaga desevolvedor junior")
})
