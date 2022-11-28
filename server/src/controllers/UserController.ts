import { prisma } from "../utils/prisma";
import { Request, Response } from "express";
import { z } from 'zod'
import { hashSync } from "bcryptjs";

class UserController {

    async createUser(req: Request, res: Response) {

        try {
            const userInfoSchema = z.object({
                name: z.string(),
                email: z.string().email(),
                password: z.string().min(6) 
            }) 
    
            const userInfo = userInfoSchema.parse(req.body)
    
            const userExists = await prisma.user.findUnique({ where: { email: userInfo.email } })
    
            if(userExists){
                return res.status(422).json({ error: 'Usuário já existente!' })
            }
    
            const hash_password = hashSync(userInfo.password, 10)
    
            const newUser = await prisma.user.create({
                data: {
                    name: userInfo.name,
                    email: userInfo.email,
                    password: hash_password
                },
                select: {
                    email: true,
                    name: true,
                    id: true
                }  
            })
    
            return res.status(201).json({ user: newUser })
        } catch (error: any) {
            console.log(`Error: ${error}`)
            return res.status(500).json({ error: error.message })
        }
        

    }

    async indexUsers(req: Request, res: Response){
        try {
            const users = await prisma.user.findMany()

            if(!users){
                return res.status(404).json({ error: 'Usuário não encontrados' })
            }

            return res.status(200).json({ users })

        } catch (error: any) {
            console.log(`Error: ${error}`)
            return res.status(500).json({ error: error.message })
        }
    }

    async updateUsers(req: Request, res: Response){
        const idUser = req.userId

        const userUpdate = await prisma.user.findUnique({
            where: { id: idUser }
        })

        if(!userUpdate){
            return res.status(404).json({ error: 'Usuário não encontrado' })
        }

        if(userUpdate.id !== idUser){
            return res.status(422).json({ error: 'Você só pode atualizar o seu usuário' })
        }

        const userUpdateSchema = z.object({
            name: z.string().min(5).optional(),
            email: z.string().email().optional(),
            password: z.string().optional()
        })

        const userUpdateOptions = userUpdateSchema.parse(req.body)

        const hash_password = hashSync(userUpdateOptions.password, 10)

        const newUserUpdate = {
            id: idUser,
            name: userUpdateOptions.name ? userUpdateOptions.name : userUpdate.name,
            email: userUpdateOptions.email ? userUpdateOptions.email : userUpdate.email,
            password: userUpdateOptions.password ? hash_password : userUpdate.password
        }

        await prisma.user.update({
            where: { id: userUpdate.id},
            data: newUserUpdate
        })

        return res.status(200).json({ message: 'Usuário atualizado' })

    }

}

export default new UserController()
