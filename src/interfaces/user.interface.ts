interface Address {
    street: string;
    city: string;
    country: string;
}

interface FullName {
    firstName: string;
    lastName: string;
}

interface Orders {
    productName: string;
    price: number;
    quantity: number;
}

interface IUser {
    userId: number;
    username: string;
    password: string;
    fullName: FullName;
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string[];
    address: Address;
    orders: Orders[];
}


export { IUser };