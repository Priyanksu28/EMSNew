import express from 'express'
import authMiddleware from '../middleware/authMiddlware.js'
import {addIssue, getIssues} from '../controllers/issueController.js'


const router = express.Router()


router.post('/add', authMiddleware, addIssue)
router.get('/:id', authMiddleware, getIssues)



export default router