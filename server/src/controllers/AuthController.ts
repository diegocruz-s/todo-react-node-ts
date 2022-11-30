import { prisma } from "../utils/prisma";
import { Request, Response } from "express";
import { z } from 'zod'
import { compareSync } from "bcryptjs";
import { generateToken } from "../utils/generateToken";

class AuthController {
    async login(req: Request, res: Response){
        try {
            const userSchemaLogin = z.object({
                email: z.string().email({ message: 'Autenticação inválida' }),
                password: z.string()
            })
    
            const userLogin = userSchemaLogin.parse(req.body)

            const user = await prisma.user.findUnique({ where: { email: userLogin.email } })

            if(!user){
                return res.status(404).json({ error: 'Autenticação inválida' })
            }

            const checkPassword = compareSync(userLogin.password, user.password)

            if(!checkPassword){
                return res.status(422).json({ error: 'Autenticação inválida' })
            }

            const token = await generateToken(user)

            const { id, name, email } = user
    
            res.status(200).json(
                { user: { id, name, email }, token }
            )
        } catch (error: any) {
            console.log(`Error: ${error.message}`)
            const allErrors: string[] = []
            if(error.issues){
                error.issues.map((err: any) => {
                    allErrors.push(err.message)
                })
            }
            return res.status(500).json({ error: allErrors[0] })
        }
        
    }
}

export default new AuthController()
