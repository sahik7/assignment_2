import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../../config";
import { IUser, UserModel } from "./user.interface";



const userSchema = new Schema<IUser, UserModel>({
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true }
    },
    age: { type: Number, required: true },
    email: { type: String, required: true },
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
    }]
});

userSchema.statics.isUserExists = async function (userId: number) {
    const currentUser = await User.findOne({ userId })
    return currentUser;
}



userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds));
    next();
})


userSchema.post("save", function (doc, next) {
    this.set('password', undefined);
    this.set('orders', undefined);
    this.set('__v', undefined);
    next()
})




export const User = model<IUser, UserModel>('User', userSchema);