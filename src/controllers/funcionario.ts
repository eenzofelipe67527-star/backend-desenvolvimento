import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../../config/prisma";
import { handleErrors } from "../helpers/handleErrors";

export default {
    login: async (request: Request, response: Response) => {
        try {
            const { email, senha } = request.body;

            if (!email || !senha) {
                return response.status(400).json("Email ou senha não fornecidos.");
            }

            const funcionario = await prisma.funcionario.findUnique({
                where: {
                    email,
                }
            });

            if (!funcionario) {
                return response.status(404).json("Email e/ou senha inválidos.");
            }
        } catch (e) {
            return handleErrors(e, response);
        }
    }

}