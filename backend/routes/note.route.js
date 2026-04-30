import { Router } from 'express';
import { getNotes, createNote, updateNote, deleteNote } from '../controllers/note.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { noteValidation } from '../utils/validation.js';

const router = Router();

router.route('/')
  .get(protect, getNotes)
  .post(protect, noteValidation, createNote);

router.route('/:id')
  .put(protect, updateNote)
  .delete(protect, deleteNote);

export default router;
