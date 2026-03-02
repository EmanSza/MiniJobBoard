import { Schema, model } from 'mongoose'

/**
 * @schema JobPostings
 * @description Schema for all Job Postings
 * @exports JobPostings
 * @access class
 */
const jobPostingsSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    }
});

export default model("JobPostings", jobPostingsSchema);