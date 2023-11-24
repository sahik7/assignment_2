import { Schema, model } from "mongoose";
import { IUser, Order } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../../config";

const orderSchema = new Schema<Order>({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
}, { _id: false });



const userSchema = new Schema<IUser>({
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
    orders: [orderSchema]
});




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







// userSchema.statics.isUserExists = async function (id: string) {
//     const currentUser = await User.findOne({ id })
//     console.log(currentUser)
//     return currentUser;
// }


const User = model<IUser>('User', userSchema);
const Order = model<Order>('Order', orderSchema);
export { User, Order };