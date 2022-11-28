import { Router, Request, Response } from 'express'
import UserController from '../controllers/UserController'
import { checkAuth } from '../middlewares/checkAuth'

const router = Router()

router.post('/', UserController.createUser)
router.get('/', checkAuth, UserController.indexUsers)
router.patch('/', checkAuth, UserController.updateUsers)

export default router