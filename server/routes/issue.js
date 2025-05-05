import express from 'express'
import authMiddleware from '../middleware/authMiddlware.js'
import {addIssue} from '../controllers/issueController.js'



const router = express.Router()


router.post('/add', authMiddleware, addIssue)



export default router