import { Request, Response } from "express";
import { services } from "./user.service";
import { userJoiSchema } from "../../../validation/user.validate";




const createNewUser = async (req: Request, res: Response) => {
    try {
        const userInfo = req.body;
        const { error, value } = userJoiSchema.validate(userInfo)
        const result = await services.createNewUser(value)

        if (error) {
            res.status(500).json({ success: false, message: error.message || "something went wrong" })
        }
        res.status(201).json({
            success: true,
            message: "User created successfully!",
            data: result
        })

    } catch (error: any) {
        res.status(422).json({
            success: false, message: error.message, error: {
                code: error.status,
                description: error.description || error.message
            }
        });
    }
}
const getFullUsers = async (req: Request, res: Response) => {
    try {
        const result = await services.getFullUsers()
        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: result
        })

    } catch (error: any) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message || "something went wrong" })
    }
}
const getSpecificUser = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.userId);
        console.log(id)
        const result = await services.getSpecificUser(id)
        res.status(200).json({
            success: true,
            message: "User fetched successfully!",
            data: result
        })

    } catch (error: any) {
        res.status(404).json({
            success: false, message: error.message, error: {
                code: error.status,
                description: error.description || error.message
            }
        });
    }
}
const modifyUser = async (req: Request, res: Response) => {
    try {
        const userInfo = req.body;
        const id = parseInt(req.params.userId);
        const result = await services.modifyUser(id, userInfo)
        res.status(200).json({
            success: true,
            message: "User updated successfully!",
            data: result
        })

    } catch (error: any) {
        res.status(404).json({
            success: false, message: error.message, error: {
                code: error.status,
                description: error.description || error.message
            }
        });
    }
}
const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.userId);
        await services.deleteUser(id)
        res.status(200).json({
            success: true,
            message: "User deleted successfully!",
            data: null
        })

    } catch (error: any) {
        res.status(404).json({
            success: false, message: error.message, error: {
                code: error.status,
                description: error.description || error.message
            }
        });
    }
}


// Create Order
const addOrder = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.userId);
        const singleOrder = req.body;
        console.log(singleOrder)
        const user = await services.addOrders(id, singleOrder)
        // const allOrders = user?.orders;
        user?.orders.push(singleOrder)


        res.status(200).json({
            success: true,
            message: "Order created successfully",
            data: null
        })

    } catch (error: any) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message || "something went wrong" })
    }
}



// Get All Orders
const getAllOrder = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.userId);
        const orders = await services.allOrders(id)
        res.status(200).json({
            success: true,
            message: "Order fetched successfully!",
            data: orders[0]
        })

    } catch (error: any) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message || "something went wrong" })
    }
}



// Get Total Price
const getTotalPrice = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.userId);
        const total = await services.totalPrice(id)
        console.log(total)
        res.status(200).json({
            success: true,
            message: "Total price calculated successfully!",
            data: total
        })

    } catch (error: any) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message || "something went wrong" })
    }
}

export const userController = {
    createNewUser,
    getFullUsers,
    getSpecificUser,
    modifyUser,
    deleteUser,
    addOrder,
    getAllOrder,
    getTotalPrice
}