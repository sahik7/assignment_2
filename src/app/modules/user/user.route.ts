import express from 'express';
import { userController } from './user.controller';




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


// Orders Route
userRouter.post("/users/:userId/orders", userController.addOrder)


// Get All Orders
userRouter.get("/users/:userId/orders", userController.getAllOrder)


// Get the total price of orders
userRouter.get("/users/:userId/orders/total-price", userController.getTotalPrice)



export const userRoutes = {
    userRouter
} 