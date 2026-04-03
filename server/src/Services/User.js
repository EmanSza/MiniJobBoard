import UserRepository from "../Repository/UserRepository.js";
import createError from "http-errors";
import { isMongoId } from "../Utility/Regex.js";

const userRepository = new UserRepository();

const getUsers = async () => {
    // TODO: Return Users without sensitive data
    const users = await userRepository.find({}, { password: 0 });
    if (!users) throw createError(400, "Users not found");
    return users;
};

const getUser = async (identifier) => {
    // TODO: Move Sanitization to Middleware

    const escaped = identifier.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const filter = isMongoId(escaped)
        ? { _id: escaped }
        : { username: new RegExp(escaped, "i") };
    const user = await userRepository.findOne(filter, { password: 0 });

    if (!user) throw createError(404, "User not Found");

    return user;
};

const createUser = async () => {};

const updateUser = async () => {};

const deleteUser = async () => {};

export { getUsers, getUser, createUser, updateUser, deleteUser };
