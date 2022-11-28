import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"

interface IdUserDecoded {
    id: number
}

export async function checkAuth(req: Request, res: Response, next: NextFunction){
    const authorization = req.headers.authorization

    if(!authorization){
        return res.status(422).json({ error: 'Acesso negado!' })
    }

    try {
        const [, token] = authorization.split(' ')

        if(!token){
            return res.status(422).json({ error: 'Token inválido!' })
        }

        const decoded = await verify(token, process.env.TOKEN_SECRET!)

        if(decoded){
            const { id } = decoded as IdUserDecoded 

            req.userId = id

            next()
        }

    } catch (error: any) {
        console.log(`Error: ${error.message}`)
        return res.status(500).json({ error: 'Token inválido!!' })
    }

}