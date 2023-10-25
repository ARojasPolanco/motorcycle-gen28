import express from "express";
import { router } from "./routes/routes.js";
import { AppError } from "./error/appError.js";
import { envs } from "./config/env/envitoments.js";
import { goblarErrorHandler } from "./error/error.controller.js";
import { enableCors } from "./config/plugins/cors.plugin.js";
import { enableMorgan } from "./config/plugins/morgan.plugin.js";

const app = express()
const ACEPTED_ORIGINS = ['http://localhost:3200', 'http://localhost:3000']

app.use(express.json())

if (envs.NODE_ENV === 'development') {
    enableMorgan(app)
}

enableCors(app, ACEPTED_ORIGINS)

app.use('/api/v1', router)


app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use(goblarErrorHandler)

export default app;  