import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authentication(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    try {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            return response.status(401).json("Não autenticado");
        }
    } catch (e) {
        console.error(e);
        return response.status(401).json("Não autenticado");
    }
}