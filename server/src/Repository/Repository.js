/**
 * @class Repository
 * @description Generic repository class for Mongoose models
 */
class Repository {
    constructor(model) {
        this.model = model;
    }

    async findOne(filter) {
        return await this.model.findOne(filter);
    }

    async find(filter = {}) {
        return await this.model.find(filter);
    }

    async findById(id) {
        return await this.model.findById(id);
    }
    async create(data) {
        return await this.model.create(data);
    }

    async updateById(id, data) {
        return await this.model.updateOne({ _id: id }, data);
    }

    async findOneAndUpdate(filter, data, options = { new: true }) {
        return await this.model.findOneAndUpdate(filter, data, options).exec();
    }

    async deleteById(id) {
        return await this.model.deleteOne({ _id: id });
    }

    async findOneAndDelete(filter) {
        if (!filter || Object.keys(filter).length === 0) {
            throw new Error("Empty or unsafe delete filter");
        }
        return await this.model.findOneAndDelete(filter).exec();
    }
}

export default Repository;
