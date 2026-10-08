import { Router } from "express";
import alunoController from "./controllers/aluno";
import cursoController from "./controllers/cursos";
import matriculaController from "./controllers/matricula";
import funcionarioController from "./controllers/funcionario";

const routes = Router();

routes.get("/", (request, response) => {
    return response.status(200).json({ message: "Hello, World!" });
});

// Rotas de alunos
routes.get("/alunos", alunoController.list)
routes.get("/alunos/:id", alunoController.getById);
routes.post("/alunos", alunoController.create);
routes.put("/alunos/:id", alunoController.update);
routes.delete("/alunos/:id", alunoController.delete);

// Rotas de cursos
routes.get("/cursos", cursoController.list);
routes.get("/cursos/:id", cursoController.getById);
routes.post("/cursos", cursoController.create);
routes.put("/cursos/:id", cursoController.update);
routes.delete("/cursos/:id", cursoController.delete);

// Rotas de matrícula
routes.post("/matriculas/:id", matriculaController.create);
routes.delete("/matriculas/:id", matriculaController.delete);

// Rotas de funcionários
routes.post ("/login", funcionarioController.login);
export default routes;
