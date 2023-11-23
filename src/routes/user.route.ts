import express from 'express';
import { userController } from '../controllers/user.controller';




const userRouter = express.Router()
// Creating New User
userRouter.post("/users", userController.createNewUser)

export const userRoutes = {
    userRouter
} 