import * as userService from "../Services/User.js"

const getUsers = async (req, res) => {
    let users = await userService.getUsers()

    res.status(200).json(users)
    
}
// TODO: When getting a User, Identifier needs to be a MongooseID, or Username.
const getUser = async (req, res) => {
    let user = await userService.getUser(req.params.identifier)

    res.status(200).json(user)

}
// TODO: Create User, Should be Simple to get done
// Maybe make it so Admins can set an Email and a user sets up the account, would be able to re-use the feature when
// connecting apps, like linked to the website. automatically sends them an email to setup an account, fits both purposes 
// of admins making accounts, and intregration plans.
const createUser = async (req, res) => {

}
// TODO: Update User, Requires Middleware before proceeding
const updateUser = async (req, res) => {

}
// TODO: When Deleting a User, Verify identifier is a mongoDB _id
const deleteUser = async (req, res) => {

    let user = await userService.deleteUser(req.params.identifier)

    res.status(200).json(user)

}



export { getUsers, getUser, createUser, updateUser, deleteUser }