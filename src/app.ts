import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./routes/user.route";
const app: Application = express()

// parsers
app.use(express.json())
app.use(cors())

app.use("/api", userRoutes.userRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

export default app;