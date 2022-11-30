import { sign } from "jsonwebtoken";
interface UserValidateToken {
    id: number
    name: string
    email: string
    password?: string
}   

export function generateToken(user: UserValidateToken){

    const token = sign({
        id: user.id,
        email: user.email
    }, process.env.TOKEN_SECRET!, {
        expiresIn: '2d'
    })

    return token

}