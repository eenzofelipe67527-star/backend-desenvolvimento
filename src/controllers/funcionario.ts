import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../../config/prisma";
import { handleErrors } from "../helpers/handleErrors";
import jwt from "jsonwebtoken";

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

            if (!funcionario || !bcrypt.compareSync(senha, funcionario.senha)) {
                return response.status(404).json("Email e/ou senha inválidos.");
            }

            const token = jwt.sign(
                { id: funcionario.id, cargo: funcionario.cargo },
                process.env.JWT_SECRET!,
                {
                    expiresIn: "1d",
                },
            );
            return response.status(200).json({ token });
        } catch (e) {
            return handleErrors(e, response);
        }
    }

}