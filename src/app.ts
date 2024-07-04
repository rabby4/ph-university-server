import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/router';
import cookieParser from 'cookie-parser';
const app: Application = express();

// parser
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
// application routes
app.use('/api/v1', router);

const test = async (req: Request, res: Response) => {
  Promise.reject();
  const a = 10;
  res.send(a);
};

app.get('/', test);

// global error
app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
