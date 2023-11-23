import { IUser } from "../interfaces/user.interface";
import User from "../models/user.model";

// Upload One user
const createNewUser = async (userInfo: IUser): Promise<IUser> => {
    const result = await User.create(userInfo)
    return result;
}

// Get all users
const getFullUsers = async (): Promise<IUser[]> => {
    const result = await User.find()
    return result;
}


// Get a specific user with id
const getSpecificUser = async (id: number): Promise<IUser | null> => {
    const result = await User.findOne({ _id: id })
    return result;
}



// Update specific user with id
const modifyUser = async (id: number, userInfo: IUser): Promise<IUser | null> => {
    const result = await User.findByIdAndUpdate(id, userInfo, {
        new: true,
        runValidators: true
    })
    return result;
}



// Delete a particular user
const deleteUser = async (id: number): Promise<IUser | null> => {
    const result = await User.findByIdAndDelete(id)
    return result;
}


export const services = {
    createNewUser,
    getFullUsers,
    getSpecificUser,
    modifyUser,
    deleteUser


}