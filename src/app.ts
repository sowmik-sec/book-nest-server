import express, { Application } from 'express';
const app: Application = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routers from './app/routes';

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routers);

export default app;
