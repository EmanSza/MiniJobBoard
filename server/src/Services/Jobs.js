import JobRepository from "../Repository/JobRepository.js";
import createError from "http-errors";
import slug from "../Utility/Slug.js";

const jobRepository = new JobRepository();

/**
 * Retrieves all job postings.
 * @returns {Promise<import('../Models/JobPostings.js').default[]>}
 * @throws {import('http-errors').HttpError} 400 if jobs cannot be retrieved
 */
let getJobs = async () => {
    let jobs = await jobRepository.find({});
    if (!jobs) throw createError(400, "Jobs not found");
    return jobs
};

/**
 * Retrieves a single job by MongoDB ObjectId or slug.
 * @param {string} identifier - A 24-char hex ObjectId or a URL slug
 * @returns {Promise<import('../Models/JobPostings.js').default>}
 * @throws {import('http-errors').HttpError} 404 if no job is found
 */
let getJob = async (identifier) => {
    const isId = /^[a-f\d]{24}$/i.test(identifier);
    const filter = isId ? { _id: identifier } : { slug: identifier };
    const job = await jobRepository.findOne(filter);

    if (!job) throw createError(404, "Job not found");

    return job;
};

/**
 * Searches for jobs by title using a case-insensitive regex.
 * @param {string} title - Partial or full title to search for
 * @returns {Promise<import('../Models/JobPostings.js').default[]>}
 * @throws {import('http-errors').HttpError} 404 if no jobs match
 */
let searchJob = async (title) => {
    const job = await jobRepository.find({
        title: { $regex: title, $options: "i" },
    });

    if (!job.length) throw createError(404, "No jobs found");

    return job;
};

/**
 * Creates a new job posting.
 * @param {string} title
 * @param {string} content
 * @param {string} category
 * @returns {Promise<import('../Models/JobPostings.js').default>}
 * @throws {import('http-errors').HttpError} 400 if creation fails
 */
let createJob = async (title, content, category) => {
    let job = await jobRepository.create({ title, slug: slug(title), content, category });
    if (!job) throw createError(400, "Job not Created");
    return job;
};

/**
 * Deletes a job posting by its MongoDB ObjectId.
 * @param {string} id - MongoDB ObjectId string
 * @returns {Promise<object>}
 * @throws {import('http-errors').HttpError} 404 if no job is found
 */
let deleteJob = async (id) => {
    const job = await jobRepository.deleteById(id);
    if (job.deletedCount == 0) throw createError(404, "Job not Found.");

    return job;
};

/**
 * Updates a job posting by its MongoDB ObjectId. Regenerates slug if title changes.
 * @param {string} id - MongoDB ObjectId string
 * @param {object} content - Fields to update
 * @returns {Promise<import('../Models/JobPostings.js').default>}
 * @throws {import('http-errors').HttpError} 404 if no job is found
 */
let updateJob = async (id, content) => {
    if (content.title) content.slug = slug(content.title);
    const job = await jobRepository.findOneAndUpdate({ _id: id }, content);
    if (!job) throw createError(404, "Job not Found");

    return job;
};
export { getJobs, getJob, createJob, searchJob, deleteJob, updateJob };
