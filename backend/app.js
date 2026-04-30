import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.route.js';
import noteRoutes from './routes/note.route.js';
import { globalErrorHandler } from './middleware/globelErrorHandler.js';

const app = express();

app.use(cors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:3000', 'http://localhost:5173'],
    credentials: true
}));
app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/notes', noteRoutes);

app.use(globalErrorHandler)
export default app;
