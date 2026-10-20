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
                return response
                    .status(400)
                    .json("Email ou senha não fornecidos.");
            }

            const funcionario = await prisma.funcionario.findUnique({
                where: { email },
            });

            if (
                !funcionario ||
                !bcrypt.compareSync(senha, funcionario.senha)
            ) {
                return response
                    .status(401)
                    .json("Email e/ou senha inválidos.");
            }

            const token = jwt.sign(
                { id: funcionario.id, cargo: funcionario.cargo },
                process.env.JWT_SECRET!,
                { expiresIn: "1d" }
            );

            return response.status(200).json({ token });
        } catch (e) {
            return handleErrors(e, response);
        }
    },

    list: async (request: Request, response: Response) => {
        try {
            const funcionarios = await prisma.funcionario.findMany({
                omit: {
                    senha: true,
                }
            });

            return response.status(200).json(funcionarios);
        } catch (e) {
            handleErrors(e, response);
        }
    },

    getById: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const funcionario = await prisma.funcionario.findUnique({
                where: {
                    id: +id,
                },
                omit: {
                    senha: true,
                },
            });

            return response.status(200).json(funcionario);
        } catch (e) {
            return handleErrors(e, response);
        }
    },

    create: async (request: Request, response: Response) => {
        try {
            const { nome, email, cargo, cpf, senha, nascimento, telefone, endereco } = request.body;

            if (!nome || !email || !cargo || !cpf || !senha) {
                return response.status(400).json("Dados do funcionário incompletos.")
            }

            const funcionario = await prisma.funcionario.create({
                data: {
                    nome,
                    email,
                    cargo,
                    cpf,
                    nascimento: nascimento ? new Date (nascimento) : undefined,
                    telefone,
                    endereco,
                    senha: bcrypt.hashSync(senha, +process.env.BCRYPT_ROUNDS!),
                },
                omit: {
                    senha: true,
                }
            })
            
            if (!nome || !email || !cargo || !cpf || !senha) {
                    return response.status(400).json("Dados do funcionário incompletos.");
                  }

            return response.status(201).json(funcionario);
        } catch (e) {
            return handleErrors(e, response);
        }
    },

    update: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const { nome, email, cargo, cpf, senha, nascimento, telefone, endereco } = request.body;

            const funcionario = await prisma.funcionario.update({
                where: {
                    id: +id,
                },
                data: {
                    nome,
                    email,
                    cargo,
                    cpf,
                    nascimento: nascimento ? new Date(nascimento) : undefined,
                    telefone,
                    endereco,
                    senha: senha ? bcrypt.hashSync(senha, +process.env.BCRYPT_ROUNDS!) : undefined,
                },
                omit: {
                    senha: true,
                }
            });

            return response.status(200).json(funcionario);
        } catch (e) {
            return handleErrors(e, response);
        }
    },

    delete: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;

            const funcionario = await prisma.funcionario.delete({
                where: {
                    id: +id,
                },
                omit: {
                    senha: true,
                }
            });

            return response.status(200).json(funcionario);
        } catch (e) {
            return handleErrors(e, response);
        }
    },
}