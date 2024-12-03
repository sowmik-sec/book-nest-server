import express, { Application } from 'express';
const app: Application = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
