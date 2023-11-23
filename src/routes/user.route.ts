import express from 'express';
import { userController } from '../controllers/user.controller';




const userRouter = express.Router()


// Creating New User
userRouter.post("/users", userController.createNewUser)
// Get All Users
userRouter.get("/users", userController.getFullUsers)
// Get One User
userRouter.get("/users/:userId", userController.getSpecificUser)
// Modify One User
userRouter.put("/users/:userId", userController.modifyUser)
// Delete One User
userRouter.delete("/users/:userId", userController.deleteUser)

export const userRoutes = {
    userRouter
} 