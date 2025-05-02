import express from 'express'
import authMiddleware from '../middleware/authMiddlware.js'
import { addAssign } from '../controllers/assignController.js'


const router = express.Router()


router.post('/add', authMiddleware, addAssign)


export default router