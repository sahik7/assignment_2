
import { IUser } from "./user.interface";
import { User } from "./user.model";

// Upload One user
const createNewUser = async (userInfo: IUser): Promise<IUser> => {
    const result = await User.create(userInfo)
    if (await User.isUserExists(userInfo.userId)) {
        throw new Error(`User ${userInfo.userId} already exists`)
    }
    return result;
}

// Get all users
const getFullUsers = async (): Promise<IUser[]> => {
    const result = await User.find().select({ username: 1, fullName: 1, age: 1, email: 1, address: 1, _id: 0 })
    return result;
}


// Get a specific user with id
const getSpecificUser = async (userId: number): Promise<IUser | null> => {
    const result = await User.findOne({ userId }).select({ password: 0, _id: 0, orders: 0, __v: 0 })
    return result;
}



// Update specific user with id
const modifyUser = async (userId: number, userInfo: IUser): Promise<IUser | null> => {
    const result = await User.findOneAndUpdate({ userId }, userInfo, {
        new: true,
        runValidators: true
    }).select({ password: 0, _id: 0, orders: 0, __v: 0 })
    return result;
}


// Delete a particular user
const deleteUser = async (userId: number): Promise<IUser | null> => {
    const result = await User.findOneAndDelete({ userId })
    return result;
}



// Create Order
const addOrders = async (userId: number, orderData: Object[]): Promise<IUser | null> => {
    const result = await User.findOneAndUpdate({ userId }, { $push: { orders: orderData } },
        { new: true, runValidators: true })
    return result;
}

// Get All Orders
const allOrders = async (userId: number): Promise<any | null> => {
    const result = await User.aggregate([
        { $match: { userId } },
        { $unwind: "$orders" }, {
            $group: {
                _id: null,
                orders: { $push: "$orders" }
            }
        }, {
            $project: {
                _id: 0,
                orders: {
                    _id: 0,
                }
            }
        }

    ])
    return result;
}


// Add A Particular Order
const totalPrice = async (userId: number): Promise<any[] | null> => {
    const result = await User.aggregate([
        { $match: { userId } },
        { $unwind: '$orders' },
        {
            $group: {
                _id: null,
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