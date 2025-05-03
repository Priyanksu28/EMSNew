import express from 'express'
import authMiddleware from '../middleware/authMiddlware.js'
import { addAssign, getAssign } from '../controllers/assignController.js'


const router = express.Router()


router.post('/add', authMiddleware, addAssign)
router.get('/:id', authMiddleware, getAssign)


export default router