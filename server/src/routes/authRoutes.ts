import { Router, Request, Response } from 'express'
import AuthController from '../controllers/AuthController'

const router = Router()

router.post('/', AuthController.login)

export default router
