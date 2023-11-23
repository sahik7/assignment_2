import { Schema, model } from "mongoose";
import { IUser, UserMethods, UserModel } from "../interfaces/user.interface";

const userSchema = new Schema<IUser, UserModel, UserMethods>({
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true }
    },
    age: { type: Number, required: true },
    email: { type: String, required: true, lowercase: true },
    isActive: { type: Boolean, required: true },
    hobbies: { type: [String], default: [] },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true }
    },
    orders: [{
        productName: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true }
    }],
});

userSchema.methods.isUserExists = async function (id: string) {
    const currentUser = await User.findById(id);
    return currentUser;
}

const User = model<IUser>('User', userSchema);
export default User;