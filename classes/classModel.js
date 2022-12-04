const m = require('mongoose');
const apiResponse = require("../helpers/apiResponse");

class Models {
    constructor(model){
        this.model = model
        this.udata=false
    }

    setUdata(udata){
        this.udata=udata
    }

    async getAll(){
        return await this.model.find({ isDeleted: false })

    }

    async getByValue(body){
        return await this.model.findOne(body,this.getProjection())
    }

    async getById(id){
        return await this.model.findById(id,this.getProjection())
    }

    doConvertParam(body){
        return body
    }
    convertParam(body, updated=false){
        body.isDeleted = false, body.updated_at=Date.now()
        return this.doConvertParam(body)
    }

    convertParamDeleted(body, deleted=false){
        body.isDeleted=true, body.updated_at=Date.now()
        return this.doConvertParam(body)
    }
    insert_result(resp){
        return resp
    }

    update_result(resp){
        return resp
    }

    delete_result(resp){
        return resp
    }

    processFilter(filter){
        return filter
    }

    getProjection(){
        return ''
    }

    async insert(obj){
        console.log({obj});
        let resp = await this.model.create(this.doConvertParam(obj))
        return this.insert_result(resp)
    }

    async update(id, obj){
        let resp = await this.model.findByIdAndUpdate(id.id, this.convertParam(obj, true))
        return this.update_result(resp)
    }

    async delete(id, obj){
        let resp = await this.model.findByIdAndUpdate(id.id, this.convertParamDeleted(obj, true))
        return this.delete_result(resp)
    }

    async paging(limit, offset, filter, sort, select=''){
        const results = await this.model.find(this.processFilter(filter), this.getProjection(),{skip:parseInt(offset), limit:parseInt(limit), sort:sort}).select(select);
        const total = await this.model.countDocuments(filter);
        return {results, total}
    }
}

module.exports = Models