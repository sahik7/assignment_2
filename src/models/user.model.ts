import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import bcrypt from "bcrypt";
import config from "../config";


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
    orders: [{
        productName: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true }
    }],
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


// Query Middleware
// userSchema.pre("find", function (next) {
//     this.select({ username: 1, fullName: 1, age: 1, email: 1, address: 1, _id: 0 })
//     next()
// })


// userSchema.pre("findOne", function (next) {
//     this.select({ password: 0, orders: 0, _id: 0, __v: 0 })
//     next()
// })



// userSchema.statics.isUserExists = async function (id: string) {
//     const currentUser = await User.findOne({ id })
//     console.log(currentUser)
//     return currentUser;
// }


const User = model<IUser>('User', userSchema);
export default User;