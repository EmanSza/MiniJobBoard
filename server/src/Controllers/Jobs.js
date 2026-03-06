import * as jobService from "../Services/Jobs.js";

/**
 * Retrieves all jobs, or searches by title if a `search` query param is provided.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
let getJobs = async (req, res) => {
    const { search } = req.query;
    let jobs = search
        ? await jobService.searchJob(search)
        : await jobService.getJobs();

    res.status(200).json(jobs);
};

/**
 * Retrieves a single job by MongoDB ObjectId or slug.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
let getJob = async (req, res) => {
    let job = await jobService.getJob(req.params.identifier);

    res.status(200).json(job);
};

/**
 * Creates a new job posting.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
let createJob = async (req, res) => {
    const { title, content, category } = req.body;

    let job = await jobService.createJob(title, content, category);

    res.status(200).json(job);
};

let deleteJob = async (req, res) => {
    let job = await jobService.deleteJob(req.params.identifier);

    res.status(200).json(job);
};

let updateJob = async (req, res) => {
    let job = await jobService.updateJob(req.body.id, req.body.content);
    res.status(200).json(job);
};

export { getJobs, createJob, getJob, deleteJob, updateJob };
