import { Router } from "express";
import * as noteController from "../controllers/note.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import * as validation from "../utils/validation.js";

const router = Router();

router.use(protect);
router
  .route("/")
  .get(noteController.getNotes)
  .post(validation.noteValidation, noteController.createNote);
router
  .route("/:id")
  .put(validation.noteValidation, noteController.updateNote)
  .delete(noteController.deleteNote);

export default router;
