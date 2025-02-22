import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { errorHandler } from './presentation/middlewares/errorHandler';
import { taskRoutes } from './presentation/routes/taskRoutes';
import { userRoutes } from './presentation/routes/userRoutes';

const app = express();

// Middleware
app.use(helmet());
app.use(
	cors({
		origin: ['https://challengue-atom.web.app', 'http://localhost:3000'],
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
		credentials: true,
	})
);
app.use(express.json());

app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);

app.use(errorHandler);

if (process.env.NODE_ENV !== 'production') {
	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
}

export default app;
