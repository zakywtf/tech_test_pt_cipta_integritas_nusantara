const Models = require("../classes/classModel");
const sch = require("../schemas/api_keys");
const { generate } = require("../helpers/randGen");

class ApiKeysModels extends Models{
    constructor(){
        super(sch)
    }

    doConvertParam(body){
        return body
    }

    insert_result(resp){
        return resp
    }

    async insert(body){
        console.log({ body });
        const key = await generate(45, false)

        const obj = {...body, key: key}
        let resp = await this.model.create(this.doConvertParam(obj))
        return this.insert_result(resp)
    }

    
}

module.exports=ApiKeysModels