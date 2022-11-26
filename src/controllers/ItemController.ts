import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../utils/prisma";

class ItemController {

    async create(req: Request, res: Response){
        try {
            const itemSchema = z.object({
                title: z.string().min(5),
                description: z.string(),
            })

            const itemInfo = itemSchema.parse(req.body)

            const idUser = req.userId

            const newItem = await prisma.item.create({
                data: {
                    title: itemInfo.title,
                    description: itemInfo.description,
                    checkItem: false,
                    userId: idUser
                }
            })

            if(!newItem){
                return res.status(422).json({ error: 'Erro na criação do item' })
            }

            return res.status(201).json({ item: newItem })

        } catch (error: any) {
            console.log(`Error: ${error}`)
            return res.status(500).json({ error: error.message })
        }
        
    }

    async index(req: Request, res: Response){
        try {
           const idUser = req.userId
           
           const items = await prisma.item.findMany({ where: { 
                userId: idUser
            }})

            if(!items){
                return res.status(404).json({ error: 'Itens não encontrados' })
            }

            return res.status(200).json({ items })
           
        } catch (error: any) {
            console.log(`Error: ${error}`)
            return res.status(500).json({ error: error.message })
        }
    }

    async delete(req: Request, res: Response){
        try {
            const { id } = req.params

            const idUser = req.userId

            const itemDelete = await prisma.item.findFirst({ where: { 
                userId: idUser,
                id: +id
            }})

            if(!itemDelete){
                return res.status(404).json({ error: 'Item não encontrado' })
            }

            await prisma.item.delete({ where: { id: itemDelete.id } })

            return res.status(200).json({ message: 'Item deletado' })

        } catch (error: any) {
            console.log(`Error: ${error}`)
            return res.status(500).json({ error: error.message })
        }
    }

    async update(req: Request, res: Response){
        try {
            const itemSchema = z.object({
                title: z.string().min(5),
                description: z.string(),
            })

            const itemUpdateInfo = itemSchema.parse(req.body)

            const { id } = req.params
            const idUser = req.userId

            const item = await prisma.item.findUnique({ where: { id: +id } })

            if(!item){
                return res.status(404).json({ error: 'Item não encontrado' })
            }

            const user = await prisma.item.findUnique({ where: { id: idUser } })

            if(!user){
                return res.status(404).json({ error: 'Usuário não encontrado' })
            }

            if(item.userId !== user.id){
                return res.status(404).json({ error: 'Você só pode atualizar os seus itens' })
            }

            const newItemUpdate = await prisma.item.update({
                where: {
                  id: +id,
                },
                data: {
                  title: itemUpdateInfo.title,
                  description: itemUpdateInfo.description
                },
              })

            return res.status(200).json({ item: newItemUpdate })
            
        } catch (error: any) {
            console.log(`Error: ${error}`)
            return res.status(500).json({ error: error.message })
        }
    }

    async checkItem(req: Request, res: Response){
        try {
            const { id } = req.params

            const idUser = req.userId

            const itemUpdate = await prisma.item.findFirst({ where: { 
                userId: idUser,
                id: +id
            }})

            if(!itemUpdate){
                return res.status(404).json({ error: 'Item não encontrado' })
            }

            if(itemUpdate.checkItem){
                return res.status(200).json({ message: 'Item atualizado' })
            }

            await prisma.item.update({
                where: {
                    id: itemUpdate.id
                },
                data: {
                    checkItem: true
                }
            })

            return res.status(200).json({ message: 'Item atualizado' })

        } catch (error: any) {
            console.log(`Error: ${error}`)
            return res.status(500).json({ error: error.message })
        }
    }

}

export default new ItemController()
