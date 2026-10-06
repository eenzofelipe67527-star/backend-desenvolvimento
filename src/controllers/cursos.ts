import { Request, Response } from "express";
import { prisma } from "../../config/prisma"
import { handleErrors } from "../helpers/handleErrors";

export default {
    list: async (request: Request, response: Response) => {
        try {
            const cursos = await prisma.curso.findMany({
                include: {
                    alunos: true,
                },
            });

            return response.status(200).json(cursos);
        } catch (e) {
            handleErrors(e, response);
        }
    },

    getById: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const curso = await prisma.curso.findUnique({
                where: {
                    id: +id,
                },
                include: {
                    alunos: true,
                },
            });

            return response.status(200).json(curso);
        } catch (e) {
            return handleErrors(e, response);
        }
    },

    create: async (request: Request, response: Response) => {
        try {
            const { nome, cargaHoraria, descricao } = request.body;

            if (!nome || !cargaHoraria || !descricao) {
                return response.status(400).json("Dados do curso incompletos.")
            }

            const curso = await prisma.curso.create({
                data: {
                    nome,
                    cargaHoraria,
                    descricao
                }
            })

            return response.status(201).json(curso);
        } catch (e) {
            return handleErrors(e, response);
        }
    },

    update: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const { nome, duracao, descricao } = request.body;

            const curso = await prisma.curso.update({
                where: {
                    id: +id,
                },
                data: {
                    nome,
                    duracao,
                    descricao
                }
            });

            return response.status(200).json(curso);
        } catch (e) {
            return handleErrors(e, response);
        }
    },

    delete: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;

            const curso = await prisma.curso.delete({
                where: {
                    id: +id,
                }
            });

            return response.status(200).json(curso);
        } catch (e) {
            return handleErrors(e, response);
        }
    },
}