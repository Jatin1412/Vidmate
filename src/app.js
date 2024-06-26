import express from 'express'
const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200
}))

app.use(express.json({limit: "30kb"}))
app.use(express.urlencoded({extended: true, optionsSuccessStatus: 201, limit: "30kb"}))
app.use(express.static("public"))
app.use(cookieParser({}))

export { app }