import UserRepository from "../Repository/UserRepository.js";
import createError from 'http-errors'
import bcrypt from 'bcrypt'
const userRepository = new UserRepository();

let registerUser = async (email, username, password, tos_agreement) => {
    // Too many database calls? should be able to reduce this
    if (await userRepository.findOne({email:email})) throw createError(409, "Email is already in use")
    if (await userRepository.findOne({username: username})) throw createError(409, "Username is already in use")

    let user = await userRepository.create({
        email: email,
        username: username,
        password: await bcrypt.hash(password, 10)
    })

    if (!user) throw createError(500, "User not Created")

    return user
}

let findUser = async (email) => {
    let user = await userRepository.findOne({email: email});

    if (!user) return null

    return user
} 


export {registerUser, findUser};