import Repository from "./Repository.js";
import Users from "../Models/Users.js";
/**
 * @class UserRepository
 * @description Repository class for Users
 * @extends Repository
 */
class UserRepository extends Repository {
    constructor() {
        super(Users);
    }
}

export default UserRepository;
