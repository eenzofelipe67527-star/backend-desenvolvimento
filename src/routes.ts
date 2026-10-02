import { Router } from "express";
import alunoController from "./controllers/aluno";

const routes = Router();

routes.get("/", (request, response) => {
    return response.status(200).json({ message: "Hello, World!" });
});

// Rotas de alunos
routes.get("./alunos", alunoController.list)

export default routes;
