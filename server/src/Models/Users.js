import { Schema, model } from "mongoose";

/**
 * @schema JobPostings
 * @description Schema for all Job Postings
 * @exports JobPostings
 * @access class
 */
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 16,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

export default model("Users", userSchema);
