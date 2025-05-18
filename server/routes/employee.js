import express from 'express'
import authMiddleware from '../middleware/authMiddlware.js'
import { addEmployee, upload, getEmployees, getEmployee, editEmployee, deleteEmployee, fetchEmployeesByDepId } from '../controllers/employeeController.js'

const router = express.Router()

router.get('/', authMiddleware, getEmployees)
router.post('/add', authMiddleware, upload.single("image"), addEmployee)
router.get('/:id', authMiddleware, getEmployee)
router.put('/:id', authMiddleware, editEmployee)
router.delete('/:id', authMiddleware, deleteEmployee)
router.get('/department/:id', authMiddleware, fetchEmployeesByDepId)

export default router