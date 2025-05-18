import express from 'express'
import authMiddleware from '../middleware/authMiddlware.js'
import { addIssue,getIssue,getIssues,getIssueDetail,updateIssue } from '../controllers/issueController.js'

const router = express.Router()


router.post('/add', authMiddleware, addIssue)
router.get('/detail/:id', authMiddleware, getIssueDetail)
router.get('/', authMiddleware, getIssues) 
router.get('/:id', authMiddleware, getIssue)
router.put('/:id', authMiddleware, updateIssue)

export default router


