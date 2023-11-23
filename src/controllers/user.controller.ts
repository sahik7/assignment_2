import { Request, Response } from "express";
import { services } from "../services/user.service";

const createNewUser = async (req: Request, res: Response) => {
    try {
        const userInfo = req.body;
        const result = await services.createNewUser(userInfo)
        res.status(201).json({
            success: true,
            message: "User created successfully!",
            data: result
        })

    } catch (error: any) {
        console.log(error);
        res.status(500).json({ status: "failed", message: error.message || "user not created successfully" })
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
        res.status(500).json({ status: "failed", message: error.message || "user not created successfully" })
    }
}
const getSpecificUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await services.getSpecificUser(id)
        res.status(200).json({
            success: true,
            message: "User fetched successfully!",
            data: result
        })

    } catch (error: any) {
        console.log(error);
        res.status(500).json({ status: "failed", message: error.message || "user not created successfully" })
    }
}
const modifyUser = async (req: Request, res: Response) => {
    try {
        const userInfo = req.body;
        const id = req.params.id;
        const result = await services.modifyUser(id, userInfo)
        res.status(200).json({
            success: true,
            message: "User updated successfully!",
            data: result
        })

    } catch (error: any) {
        console.log(error);
        res.status(500).json({ status: "failed", message: error.message || "user not created successfully" })
    }
}
const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await services.deleteUser(id)
        res.status(200).json({
            success: true,
            message: "User deleted successfully!",
            data: null
        })

    } catch (error: any) {
        console.log(error);
        res.status(500).json({ status: "failed", message: error.message || "user not created successfully" })
    }
}

export const userController = {
    createNewUser,
    getFullUsers,
    getSpecificUser,
    modifyUser,
    deleteUser
}