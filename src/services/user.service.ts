import mongoose from "mongoose";
import { IUser } from "../interfaces/user.interface";
import User from "../models/user.model";

// Upload One user
const createNewUser = async (userInfo: IUser): Promise<IUser> => {
    const result = await User.create(userInfo)
    return result;
}

// Get all users
const getFullUsers = async (): Promise<IUser[]> => {
    const result = await User.find({}).select({ username: 1, fullName: 1, age: 1, email: 1, address: 1, _id: 0 })
    return result;
}


// Get a specific user with id
const getSpecificUser = async (id: string): Promise<IUser | null> => {
    const result = await User.findById(id)
    return result;
}



// Update specific user with id
const modifyUser = async (id: string, userInfo: IUser): Promise<IUser | null> => {
    const result = await User.findByIdAndUpdate(id, userInfo, {
        new: true,
        runValidators: true
    })
    return result;
}


// Delete a particular user
const deleteUser = async (id: string): Promise<IUser | null> => {
    const result = await User.findByIdAndDelete(id)
    return result;
}



// Create Order
const addOrders = async (id: string, orderData: Object[]): Promise<IUser | null> => {
    const result = await User.findByIdAndUpdate(id, { $push: { orders: orderData } },
        { new: true, runValidators: true })
    return result;
}

// Get All Orders
const allOrders = async (id: string): Promise<IUser | null> => {
    const result = await User.findById(id).select({ orders: 1, _id: 0 })
    return result;
}


// Add A Particular Order
const totalPrice = async (id: string): Promise<any[] | null> => {
    const result = await User.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        { $unwind: '$orders' },
        {
            $group: {
                _id: '$_id',
                totalPrice: { $sum: { $multiply: ['$orders.price', '$orders.quantity'] } }
            }
        },
        {
            $project: {
                _id: 0,
                totalPrice: 1
            }
        }
    ]);
    return result;
}


export const services = {
    createNewUser,
    getFullUsers,
    getSpecificUser,
    modifyUser,
    deleteUser,
    addOrders,
    allOrders,
    totalPrice


}