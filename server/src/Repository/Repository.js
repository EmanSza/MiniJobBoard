/**
 * @class Repository
 * @description Generic repository class for Mongoose models
 */
class Repository {
    /**
     * @param {import('mongoose').Model} model - The Mongoose model to operate on
     */
    constructor(model) {
        this.model = model;
    }

    /**
     * Finds a single document matching the filter.
     * @param {object} filter - Mongoose query filter
     * @returns {Promise<object|null>}
     */
    async findOne(filter) {
        return await this.model.findOne(filter);
    }

    /**
     * Finds all documents matching the filter.
     * @param {object} [filter={}] - Mongoose query filter
     * @returns {Promise<object[]>}
     */
    async find(filter = {}) {
        return await this.model.find(filter);
    }

    /**
     * Finds a single document by its `_id`.
     * @param {string} id - MongoDB ObjectId string
     * @returns {Promise<object|null>}
     */
    async findById(id) {
        return await this.model.findById(id);
    }

    /**
     * Creates a new document.
     * @param {object} data - Document data to insert
     * @returns {Promise<object>}
     */
    async create(data) {
        return await this.model.create(data);
    }

    /**
     * Updates a document by its `_id`.
     * @param {string} id - MongoDB ObjectId string
     * @param {object} data - Fields to update
     * @returns {Promise<object>}
     */
    async updateById(id, data) {
        return await this.model.updateOne({ _id: id }, data);
    }

    /**
     * Finds a single document matching the filter and updates it.
     * @param {object} filter - Mongoose query filter
     * @param {object} data - Fields to update
     * @param {object} [options={ new: true }] - Mongoose update options
     * @returns {Promise<object|null>}
     */
    async findOneAndUpdate(filter, data, options = { returnDocument: 'after' }) {
        return await this.model.findOneAndUpdate(filter, data, options).exec();
    }

    /**
     * Deletes a document by its `_id`.
     * @param {string} id - MongoDB ObjectId string
     * @returns {Promise<object>}
     */
    async deleteById(id) {
        return await this.model.deleteOne({ _id: id });
    }

    /**
     * Finds a single document matching the filter and deletes it.
     * @param {object} filter - Mongoose query filter (must be non-empty)
     * @returns {Promise<object|null>}
     * @throws {Error} If filter is empty or missing
     */
    async findOneAndDelete(filter) {
        if (!filter || Object.keys(filter).length === 0) {
            throw new Error("Empty or unsafe delete filter");
        }
        return await this.model.findOneAndDelete(filter).exec();
    }
}

export default Repository;
