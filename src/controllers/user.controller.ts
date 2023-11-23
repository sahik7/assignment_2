import { Request, Response } from "express";
import User from "../models/user.model";

const createNewUser = async (req: Request, res: Response) => {
    try {
        const userInfo = req.body;
        console.log(userInfo)
        const result = await User.create(userInfo)
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

export const userController = {
    createNewUser
}