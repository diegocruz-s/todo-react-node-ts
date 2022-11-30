import { Router, Request, Response } from 'express'
import ItemController from '../controllers/ItemController'
import { checkAuth } from '../middlewares/checkAuth'

const router = Router()

router.get('/', checkAuth, ItemController.index)
router.post('/', checkAuth, ItemController.create)
router.delete('/:id', checkAuth, ItemController.delete)
router.patch('/:id', checkAuth, ItemController.update)
router.patch('/checkitem/:id', checkAuth, ItemController.checkItem)
router.get('/:id', checkAuth, ItemController.findById)

export default router
