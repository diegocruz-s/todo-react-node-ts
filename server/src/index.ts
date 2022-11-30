import express from 'express'
import userRoutes from './routes/userRoutes'
import authRoutes from './routes/authRoutes'
import itemRoutes from './routes/itemRoutes'
import { prisma } from './utils/prisma'
import cors from 'cors'
import 'dotenv/config'

class AppController {
    
    app: express.Application

    constructor(){
        this.app = express()
        this.middlewares()
        this.routes()
    }

    middlewares(){
        this.app.use(express.json())
        this.app.use(cors())
    }

    routes(){
        this.app.use('/users', userRoutes)
        this.app.use('/auth', authRoutes)
        this.app.use('/item', itemRoutes)
    }

}

new AppController().app.listen(3334, ()=>{
    console.log('Server running on port 3334')
}) 
