import User from "./user.model";

export const getAllDetails = async () => {
    const users = await User.find();
    return users;
}

export const getDetails = async (userId) => {
    const user = await User.findById({ _id: userId });
    console.log(user);
    return user;
}

export const createUser = async (body) => {
    const user = await new User(body);
    return user;
}

