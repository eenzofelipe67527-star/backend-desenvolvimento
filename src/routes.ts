import { Router } from "express";

const routes = Router();

routes.get("/fibonacci/:quantidade", (request, response) => {
    const quantidade = Number(request.params.quantidade);

    const fibonacci: number[] = [];

    for (let i = 0; i < quantidade; i++) {
        if (i === 0) {
            fibonacci.push(0);
        } else if (i === 1) {
            fibonacci.push(1);
        } else {
            const proximo = fibonacci[i - 1] + fibonacci[i - 2];
            fibonacci.push(proximo);
        }
    }

    response.json(fibonacci);
});

routes.get("/fatorial/:numero", (request, response) => {
    const numero = Number(request.params.numero);

    let fatorial = 1;
    for (let i = 1; i <= numero; i++) {
        fatorial *= i;
    }

    response.json({ numero, fatorial });
});

export default routes;
