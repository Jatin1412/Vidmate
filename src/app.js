import express from 'express'
const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())

// import routes

import userRouter from './routes/user.routes.js'

app.use('/api/v1/users', userRouter);

export { app }