import { Router } from 'express';
import { registerUser, loginUser, changePassword, editUser } from '../controllers/user.controller.js';
import { registerValidation, loginValidation, changePasswordValidation } from '../utils/validation.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);
router.post('/change-password', protect, changePasswordValidation, changePassword);
router.put('/edit-user', protect, editUser);

export default router;
