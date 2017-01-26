exports = module.exports = class BaseProxy {
    constructor(model) {
        this.model = model;
    }

    getById(id) {
        return this.model.findOne({_id: id}).lean();
    }

    getByIds(ids) {
        return this.model.find({'_id': {'$in': ids}}).lean();
    };


    deleteById(id) {
        return this.model.findOneAndUpdate({_id: id}, {is_deleted: true, update_at: new Date()}).lean();
    }

    removeById(id) {
        return this.model.remove({_id: id}).lean();
    }

    update(data) {
        data.update_at = new Date();
        return this.model.findOneAndUpdate({_id: data._id}, data).lean();
    };

    save(data) {
        return new this.model(data).save();
    }

    getAll() {
        return this.model.find().lean();
    }

    getByPage(currentPage = 1, pageSize = 10, queries = {}) {
        const options = {skip: (currentPage - 1) * pageSize, limit: pageSize, sort: '-create_at'};
        const query = {};
        Object.keys(queries).forEach(v => {
            query[v] = new RegExp(queries[v]);
        });
        query.is_deleted = false;
        return this.model.find(query, '', options).lean();
    }

    getCountByQuery(queries = {}) {
        const query = {};
        Object.keys(queries).forEach(v => {
            query[v] = new RegExp(queries[v]);
        });

        if (query.is_deleted === undefined) {
            query.is_deleted = false;
        }
        return this.model.count(query);
    }

    getByQuery(query, opt) {
        if (query.is_deleted === undefined) {
            query.is_deleted = false;
        }
        return this.model.find(query, '', opt).lean();
    }
}