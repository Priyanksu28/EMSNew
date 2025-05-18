import express from 'express'
import authMiddleware from '../middleware/authMiddlware.js'
import { addAsset, upload, getAssets, getAsset, editAsset, deleteAsset, fetchAssetsById } from '../controllers/assetController.js'

const router = express.Router()

router.get('/', authMiddleware, getAssets)
router.post('/add', authMiddleware, upload.single("image"), addAsset)
router.get('/:id', authMiddleware, getAsset)
router.put('/:id', authMiddleware, editAsset)
router.delete('/:id', authMiddleware, deleteAsset)
router.get('/department/:id', authMiddleware, fetchAssetsById)

export default router
