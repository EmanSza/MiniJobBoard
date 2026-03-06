import Repository from "./Repository.js";
import JobPostings from "../Models/JobPostings.js";
/**
 * @class JobRepository
 * @description Repository class for Job postings
 * @extends Repository
 */
class JobRepository extends Repository {
    constructor() {
        super(JobPostings);
    }
}

export default JobRepository;
