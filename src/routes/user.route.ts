import express from 'express';
import { userController } from '../controllers/user.controller';




const userRouter = express.Router()


// Creating New User
userRouter.post("/users", userController.createNewUser)
userRouter.get("/users", userController.getFullUsers)
userRouter.get("/users/:userId", userController.getSpecificUser)
userRouter.put("/users/:userId", userController.modifyUser)
userRouter.delete("/users/:userId", userController.deleteUser)

export const userRoutes = {
    userRouter
} 