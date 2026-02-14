import express from 'express'
import multer from 'multer'
import { deleteDocument, getDocuments, uploadDocument } from '../controllers/documentController.js'
import { protect } from '../middleware/authMiddleware.js'
import { authorizeRoles } from '../middleware/roleMiddleware.js'

const router = express.Router()
const upload = multer({ dest: 'uploads/' })

router.get('/', protect, authorizeRoles('ADMIN'), getDocuments)
router.post('/upload', protect, authorizeRoles('ADMIN'), upload.single('file'), uploadDocument)
router.delete('/:id', protect, authorizeRoles('ADMIN'), deleteDocument)

export default router